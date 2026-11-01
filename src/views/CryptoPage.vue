<template>
  <ion-page>
    <!-- Header aplikasi -->
    <ion-header class="main-header">
      <ion-toolbar>
        <div class="header-container">
          <ion-title>
            <p class="subtitle">Cryptocurrency Market</p>
          </ion-title>

          <!-- Tombol refresh di kanan header -->
          <ion-buttons>
            <ion-button class="header-refresh" @click="refreshData" :disabled="loading" aria-label="Refresh data">
              <ion-spinner v-if="loading" name="crescent"></ion-spinner>
              <ion-icon v-else :icon="refreshOutline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="main-content">
      <div class="container">
        <!-- Judul halaman -->
        <div class="welcome-section">
          <h1>Pantau Aset Digital</h1>
        </div>

        <!-- Pencarian -->
        <ion-searchbar
          v-model="searchText"
          placeholder="Cari nama atau simbol crypto..."
          class="search-box"
          :debounce="200"
        ></ion-searchbar>

        <!-- Pesan error -->
        <div v-if="errorMessage" class="message-card error-message">
          <p>{{ errorMessage }}</p>
          <ion-button fill="clear" @click="refreshData"> Coba Lagi </ion-button>
        </div>

        <!-- Loading -->
        <div v-else-if="loading && cryptos.length === 0" class="message-card">
          <ion-spinner name="crescent"></ion-spinner>
          <p>Mengambil data cryptocurrency...</p>
        </div>

        <!-- Daftar data -->
        <template v-else>
          <!-- Tiga peringkat teratas -->
          <div v-if="topCryptos.length > 0" class="top-section">
            <div class="section-heading">
              <h2>Top 3 Cryptocurrency</h2>
              <span>Peringkat teratas</span>
            </div>

            <div class="top-grid">
              <ion-card v-for="crypto in topCryptos" :key="crypto.id || crypto.symbol" class="top-card">
                <ion-card-content>
                  <div class="top-rank">#{{ crypto.rank }}</div>

                  <div class="coin-symbol-icon">
                    {{ crypto.symbol }}
                  </div>

                  <h3>{{ crypto.name }}</h3>

                  <div class="price-label">USD</div>

                  <!-- Harga tetap putih -->
                  <p class="top-price">
                    {{ formatPrice(crypto.price_usd) }}
                  </p>

                  <!-- Perubahan harga 24 jam -->
                  <small
                    v-if="hasPriceChange(crypto)"
                    class="price-change"
                    :class="priceChangeClass(crypto.percent_change_24h)"
                  >
                    <span class="change-symbol">
                      {{ priceChangeArrow(crypto.percent_change_24h) }}
                    </span>
                    {{ formatChange(crypto.percent_change_24h) }}%
                    <span>(24 jam)</span>
                  </small>

                  <small v-else class="price-change price-neutral"> Data tidak tersedia </small>
                </ion-card-content>
              </ion-card>
            </div>
          </div>

          <!-- Cryptocurrency peringkat selanjutnya -->
          <div v-if="otherCryptos.length > 0" class="other-section">
            <div class="section-heading">
              <h2>Daftar Cryptocurrency</h2>
              <span>{{ otherCryptos.length }} aset lainnya</span>
            </div>

            <ion-card v-for="crypto in otherCryptos" :key="crypto.id || crypto.symbol" class="crypto-card">
              <ion-card-content>
                <div class="crypto-row">
                  <div class="rank-badge">#{{ crypto.rank }}</div>

                  <div class="crypto-info">
                    <h3>{{ crypto.name }}</h3>
                    <p>{{ crypto.symbol }}</p>
                  </div>

                  <div class="crypto-price">
                    <small>USD</small>

                    <!-- Harga tidak ikut berubah warna -->
                    <h3>
                      {{ formatPrice(crypto.price_usd) }}
                    </h3>

                    <!-- Warna hanya pada perubahan harga -->
                    <small
                      v-if="hasPriceChange(crypto)"
                      class="price-change"
                      :class="priceChangeClass(crypto.percent_change_24h)"
                    >
                      <span class="change-symbol">
                        {{ priceChangeArrow(crypto.percent_change_24h) }}
                      </span>
                      {{ formatChange(crypto.percent_change_24h) }}%
                    </small>

                    <small v-else class="price-change price-neutral"> Data tidak tersedia </small>
                  </div>
                </div>
              </ion-card-content>
            </ion-card>
          </div>

          <!-- Jika pencarian tidak menemukan data -->
          <div v-if="filteredCryptos.length === 0" class="message-card">
            <ion-icon :icon="searchOutline" size="large"></ion-icon>
            <p>Cryptocurrency tidak ditemukan.</p>
          </div>
        </template>

        <!-- Catatan sumber data -->
        <p class="footer-text">
          Data cryptocurrency disediakan oleh CoinLore API. Persentase menunjukkan perubahan harga dalam 24 jam
          terakhir.
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from 'axios';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonButton,
  IonIcon,
  IonSpinner,
  IonSearchbar,
  IonCard,
  IonCardContent,
} from '@ionic/vue';

import { refreshOutline, searchOutline } from 'ionicons/icons';

import '../theme/Crypto.css';

const API_URL = 'https://api.coinlore.net/api/tickers/';

export default {
  name: 'CryptoMarket',

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonButton,
    IonIcon,
    IonSpinner,
    IonSearchbar,
    IonCard,
    IonCardContent,
  },

  data() {
    return {
      cryptos: [],
      loading: false,
      errorMessage: '',
      searchText: '',
      refreshOutline,
      searchOutline,
    };
  },

  computed: {
    // Data yang sesuai dengan pencarian
    filteredCryptos() {
      const keyword = this.searchText.trim().toLowerCase();

      if (!keyword) {
        return this.cryptos;
      }

      return this.cryptos.filter((crypto) => {
        const name = String(crypto.name || '').toLowerCase();
        const symbol = String(crypto.symbol || '').toLowerCase();

        return name.includes(keyword) || symbol.includes(keyword);
      });
    },

    // Cryptocurrency peringkat 1, 2, dan 3
    topCryptos() {
      return this.filteredCryptos
        .filter((crypto) => {
          const rank = Number(crypto.rank);
          return rank >= 1 && rank <= 3;
        })
        .sort((a, b) => Number(a.rank) - Number(b.rank));
    },

    // Cryptocurrency selain peringkat 1, 2, dan 3
    otherCryptos() {
      return this.filteredCryptos
        .filter((crypto) => Number(crypto.rank) > 3)
        .sort((a, b) => Number(a.rank) - Number(b.rank));
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    // Mengambil data dari CoinLore API
    async loadData() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      this.errorMessage = '';

      try {
        const response = await axios.get(API_URL, {
          timeout: 15000,
        });

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error('Format data dari server tidak sesuai.');
        }

        this.cryptos = response.data.data;
      } catch (error) {
        console.error('Gagal mengambil data crypto:', error);

        this.errorMessage = 'Data gagal dimuat. Periksa koneksi internet, lalu coba lagi.';
      } finally {
        this.loading = false;
      }
    },

    // Memuat ulang data ketika tombol refresh ditekan
    async refreshData() {
      await this.loadData();
    },

    // Memeriksa apakah perubahan harga tersedia
    hasPriceChange(crypto) {
      const change = crypto.percent_change_24h;

      return change !== null && change !== undefined && change !== '' && Number.isFinite(Number(change));
    },

    // Menentukan warna berdasarkan perubahan harga
    priceChangeClass(change) {
      const value = Number(change);

      if (!Number.isFinite(value)) {
        return 'price-neutral';
      }

      if (value > 0) {
        return 'price-up';
      }

      if (value < 0) {
        return 'price-down';
      }

      return 'price-neutral';
    },

    // Simbol segitiga naik dan turun
    priceChangeArrow(change) {
      const value = Number(change);

      if (value > 0) {
        return '▲';
      }

      if (value < 0) {
        return '▼';
      }

      return '-';
    },

    // Format persentase perubahan harga
    formatChange(change) {
      const value = Number(change);

      if (change === null || change === undefined || change === '' || !Number.isFinite(value)) {
        return 'Data tidak tersedia';
      }

      const sign = value > 0 ? '+' : '';

      return sign + value.toFixed(2);
    },

    // Format harga USD
    formatPrice(price) {
      const number = Number(price);

      if (price === null || price === undefined || price === '' || !Number.isFinite(number)) {
        return 'Tidak tersedia';
      }

      return number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: number > 0 && number < 1 ? 8 : 2,
      });
    },
  },
};
</script>
