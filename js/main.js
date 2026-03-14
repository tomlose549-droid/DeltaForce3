const COIN_CAP = 5000;
    let coinBalance = 0;
    let pendingCoins = 0;
    let currentMapIndex = 0;
    let toastTimer = null;
    let audioCtx = null;

    const RED_ITEMS = [
      { name: '劳力士', icon: 'rolex', coins: 70 },
      { name: '金条', icon: 'goldbar', coins: 78 },
      { name: '香槟', icon: 'champagne', coins: 79 },
      { name: '黄金瞪羚', icon: 'gazelle', coins: 98 },
      { name: '卫星锅', icon: 'satdish', coins: 100 },
      { name: '天圆地方', icon: 'squarecoin', coins: 105 },
      { name: '半身像', icon: 'bust', coins: 128 },
      { name: '留音机', icon: 'gramophone', coins: 129 },
      { name: '步战车模型', icon: 'ifv', coins: 130 },
      { name: '军用炮弹', icon: 'shell', coins: 142 },
      { name: '火箭燃料', icon: 'rocketfuel', coins: 180 },
      { name: '扫地机器人', icon: 'robot', coins: 195 },
      { name: '微型反应炉', icon: 'reactor', coins: 245 },
      { name: '万金泪冠', icon: 'crown', coins: 293 },
      { name: '纵横棋盘', icon: 'board', coins: 299 },
      { name: '装甲车电池', icon: 'apcbattery', coins: 666 },
      { name: '非洲之心', icon: 'heartgem', coins: 1314 }
    ];

    const discoveredRedItems = new Set();

    const maps = [
      {
        name: '零号大坝',
        cost: 0,
        loot: [
          { name: '盒装蜡烛', weight: 25, bg: 'bg-white', rarity: '常规', icon: 'candle', coins: 2 },
          { name: '酸奶', weight: 25, bg: 'bg-white', rarity: '常规', icon: 'yogurt', coins: 1 },
          { name: '石工锤', weight: 15, bg: 'bg-green', rarity: '标准', icon: 'hammer', coins: 3 },
          { name: '角磨机', weight: 15, bg: 'bg-green', rarity: '标准', icon: 'grinder', coins: 4 },
          { name: '摄像头', weight: 6, bg: 'bg-blue', rarity: '侦察', icon: 'camera', coins: 10 },
          { name: '一桶油漆', weight: 4, bg: 'bg-blue', rarity: '侦察', icon: 'paint', coins: 16 },
          { name: '海盗弯刀', weight: 2.5, bg: 'bg-purple', rarity: '稀有', icon: 'cutlass', coins: 24 },
          { name: '牛角', weight: 3.5, bg: 'bg-purple', rarity: '稀有', icon: 'horn', coins: 21 },
          { name: '海盗金币', weight: 1.8, bg: 'bg-gold', rarity: '金色', icon: 'coin', coins: 35 },
          { name: '座钟', weight: 0.7, bg: 'bg-gold', rarity: '金色', icon: 'clock', coins: 50 },
          { name: '劳力士', weight: 0.5, bg: 'bg-red', rarity: '史诗', icon: 'rolex', coins: 70 },
          { name: '金条', weight: 0.55, bg: 'bg-red', rarity: '史诗', icon: 'goldbar', coins: 78 },
          { name: '黄金瞪羚', weight: 0.3, bg: 'bg-red', rarity: '史诗', icon: 'gazelle', coins: 98 },
          { name: '军用炮弹', weight: 0.12, bg: 'bg-red', rarity: '史诗', icon: 'shell', coins: 142 },
          { name: '微型反应炉', weight: 0.026, bg: 'bg-red', rarity: '史诗', icon: 'reactor', coins: 245 },
          { name: '非洲之心', weight: 0.004, bg: 'bg-red', rarity: '传说', icon: 'heartgem', coins: 1314 }
        ]
      },
      {
        name: '长弓溪谷',
        cost: 4,
        loot: [
          { name: '酸奶', weight: 20, bg: 'bg-white', rarity: '常规', icon: 'yogurt', coins: 1 },
          { name: '盒装蜡烛', weight: 20, bg: 'bg-white', rarity: '常规', icon: 'candle', coins: 2 },
          { name: '石工锤', weight: 18, bg: 'bg-green', rarity: '标准', icon: 'hammer', coins: 3 },
          { name: '角磨机', weight: 17, bg: 'bg-green', rarity: '标准', icon: 'grinder', coins: 4 },
          { name: '摄像头', weight: 10, bg: 'bg-blue', rarity: '侦察', icon: 'camera', coins: 10 },
          { name: '一桶油漆', weight: 5, bg: 'bg-blue', rarity: '侦察', icon: 'paint', coins: 16 },
          { name: '海盗弯刀', weight: 2.5, bg: 'bg-purple', rarity: '稀有', icon: 'cutlass', coins: 24 },
          { name: '牛角', weight: 3.5, bg: 'bg-purple', rarity: '稀有', icon: 'horn', coins: 21 },
          { name: '海盗金币', weight: 1.8, bg: 'bg-gold', rarity: '金色', icon: 'coin', coins: 35 },
          { name: '座钟', weight: 0.7, bg: 'bg-gold', rarity: '金色', icon: 'clock', coins: 50 },
          { name: '香槟', weight: 1, bg: 'bg-red', rarity: '史诗', icon: 'champagne', coins: 79 },
          { name: '黄金瞪羚', weight: 0.35, bg: 'bg-red', rarity: '史诗', icon: 'gazelle', coins: 98 },
          { name: '半身像', weight: 0.038, bg: 'bg-red', rarity: '史诗', icon: 'bust', coins: 128 },
          { name: '留音机', weight: 0.038, bg: 'bg-red', rarity: '史诗', icon: 'gramophone', coins: 129 },
          { name: '步战车模型', weight: 0.038, bg: 'bg-red', rarity: '史诗', icon: 'ifv', coins: 130 },
          { name: '扫地机器人', weight: 0.032, bg: 'bg-red', rarity: '史诗', icon: 'robot', coins: 195 },
          { name: '非洲之心', weight: 0.004, bg: 'bg-red', rarity: '传说', icon: 'heartgem', coins: 1314 }
        ]
      },
      {
        name: '巴克十',
        cost: 45,
        loot: [
          { name: '石工锤', weight: 30, bg: 'bg-green', rarity: '标准', icon: 'hammer', coins: 3 },
          { name: '角磨机', weight: 30, bg: 'bg-green', rarity: '标准', icon: 'grinder', coins: 4 },
          { name: '摄像头', weight: 13, bg: 'bg-blue', rarity: '侦察', icon: 'camera', coins: 10 },
          { name: '一桶油漆', weight: 7, bg: 'bg-blue', rarity: '侦察', icon: 'paint', coins: 16 },
          { name: '海盗弯刀', weight: 5.5, bg: 'bg-purple', rarity: '稀有', icon: 'cutlass', coins: 24 },
          { name: '牛角', weight: 6, bg: 'bg-purple', rarity: '稀有', icon: 'horn', coins: 21 },
          { name: '海盗金币', weight: 3.5, bg: 'bg-gold', rarity: '金色', icon: 'coin', coins: 35 },
          { name: '座钟', weight: 2, bg: 'bg-gold', rarity: '金色', icon: 'clock', coins: 50 },
          { name: '香槟', weight: 1, bg: 'bg-red', rarity: '史诗', icon: 'champagne', coins: 79 },
          { name: '黄金瞪羚', weight: 0.45, bg: 'bg-red', rarity: '史诗', icon: 'gazelle', coins: 98 },
          { name: '劳力士', weight: 0.5, bg: 'bg-red', rarity: '史诗', icon: 'rolex', coins: 70 },
          { name: '天圆地方', weight: 0.45, bg: 'bg-red', rarity: '史诗', icon: 'squarecoin', coins: 105 },
          { name: '半身像', weight: 0.19, bg: 'bg-red', rarity: '史诗', icon: 'bust', coins: 128 },
          { name: '留音机', weight: 0.19, bg: 'bg-red', rarity: '史诗', icon: 'gramophone', coins: 129 },
          { name: '扫地机器人', weight: 0.06, bg: 'bg-red', rarity: '史诗', icon: 'robot', coins: 195 },
          { name: '万金泪冠', weight: 0.076, bg: 'bg-red', rarity: '史诗', icon: 'crown', coins: 293 },
          { name: '纵横棋盘', weight: 0.074, bg: 'bg-red', rarity: '史诗', icon: 'board', coins: 299 },
          { name: '非洲之心', weight: 0.01, bg: 'bg-red', rarity: '传说', icon: 'heartgem', coins: 1314 }
        ]
      },
      {
        name: '黑夜大坝',
        cost: 50,
        loot: [
          { name: '石工锤', weight: 25, bg: 'bg-green', rarity: '标准', icon: 'hammer', coins: 3 },
          { name: '角磨机', weight: 25, bg: 'bg-green', rarity: '标准', icon: 'grinder', coins: 4 },
          { name: '摄像头', weight: 18, bg: 'bg-blue', rarity: '侦察', icon: 'camera', coins: 10 },
          { name: '一桶油漆', weight: 12, bg: 'bg-blue', rarity: '侦察', icon: 'paint', coins: 16 },
          { name: '海盗弯刀', weight: 5.3, bg: 'bg-purple', rarity: '稀有', icon: 'cutlass', coins: 24 },
          { name: '牛角', weight: 4.7, bg: 'bg-purple', rarity: '稀有', icon: 'horn', coins: 21 },
          { name: '海盗金币', weight: 4.1, bg: 'bg-gold', rarity: '金色', icon: 'coin', coins: 35 },
          { name: '座钟', weight: 2.9, bg: 'bg-gold', rarity: '金色', icon: 'clock', coins: 50 },
          { name: '金条', weight: 1.3, bg: 'bg-red', rarity: '史诗', icon: 'goldbar', coins: 78 },
          { name: '黄金瞪羚', weight: 0.75, bg: 'bg-red', rarity: '史诗', icon: 'gazelle', coins: 98 },
          { name: '半身像', weight: 0.23, bg: 'bg-red', rarity: '史诗', icon: 'bust', coins: 128 },
          { name: '留音机', weight: 0.23, bg: 'bg-red', rarity: '史诗', icon: 'gramophone', coins: 129 },
          { name: '军用炮弹', weight: 0.3, bg: 'bg-red', rarity: '史诗', icon: 'shell', coins: 142 },
          { name: '扫地机器人', weight: 0.065, bg: 'bg-red', rarity: '史诗', icon: 'robot', coins: 195 },
          { name: '微型反应炉', weight: 0.1, bg: 'bg-red', rarity: '史诗', icon: 'reactor', coins: 245 },
          { name: '装甲车电池', weight: 0.015, bg: 'bg-red', rarity: '史诗', icon: 'apcbattery', coins: 666 },
          { name: '非洲之心', weight: 0.01, bg: 'bg-red', rarity: '传说', icon: 'heartgem', coins: 1314 }
        ]
      },
      {
        name: '航天基地',
        cost: 60,
        loot: [
          { name: '石工锤', weight: 30, bg: 'bg-green', rarity: '标准', icon: 'hammer', coins: 3 },
          { name: '角磨机', weight: 25, bg: 'bg-green', rarity: '标准', icon: 'grinder', coins: 4 },
          { name: '摄像头', weight: 16, bg: 'bg-blue', rarity: '侦察', icon: 'camera', coins: 10 },
          { name: '一桶油漆', weight: 9, bg: 'bg-blue', rarity: '侦察', icon: 'paint', coins: 16 },
          { name: '海盗弯刀', weight: 5.4, bg: 'bg-purple', rarity: '稀有', icon: 'cutlass', coins: 24 },
          { name: '牛角', weight: 4.6, bg: 'bg-purple', rarity: '稀有', icon: 'horn', coins: 21 },
          { name: '海盗金币', weight: 4, bg: 'bg-gold', rarity: '金色', icon: 'coin', coins: 35 },
          { name: '座钟', weight: 3, bg: 'bg-gold', rarity: '金色', icon: 'clock', coins: 50 },
          { name: '香槟', weight: 0.75, bg: 'bg-red', rarity: '史诗', icon: 'champagne', coins: 79 },
          { name: '金条', weight: 0.75, bg: 'bg-red', rarity: '史诗', icon: 'goldbar', coins: 78 },
          { name: '黄金瞪羚', weight: 0.35, bg: 'bg-red', rarity: '史诗', icon: 'gazelle', coins: 98 },
          { name: '卫星锅', weight: 0.55, bg: 'bg-red', rarity: '史诗', icon: 'satdish', coins: 100 },
          { name: '步战车模型', weight: 0.23, bg: 'bg-red', rarity: '史诗', icon: 'ifv', coins: 130 },
          { name: '军用炮弹', weight: 0.22, bg: 'bg-red', rarity: '史诗', icon: 'shell', coins: 142 },
          { name: '火箭燃料', weight: 0.08, bg: 'bg-red', rarity: '史诗', icon: 'rocketfuel', coins: 180 },
          { name: '微型反应炉', weight: 0.058, bg: 'bg-red', rarity: '史诗', icon: 'reactor', coins: 245 },
          { name: '非洲之心', weight: 0.012, bg: 'bg-red', rarity: '传说', icon: 'heartgem', coins: 1314 }
        ]
      }
    ];

    const cardsArea = document.getElementById('cardsArea');
    const drawButton = document.getElementById('drawButton');
    const coinCount = document.getElementById('coinCount');
    const buttonTitle = document.getElementById('buttonTitle');
    const mapCost = document.getElementById('mapCost');
    const mapNameTop = document.getElementById('mapNameTop');
    const toast = document.getElementById('toast');
    const prevMap = document.getElementById('prevMap');
    const nextMap = document.getElementById('nextMap');
    const codexButton = document.getElementById('codexButton');
    const codexOverlay = document.getElementById('codexOverlay');
    const codexClose = document.getElementById('codexClose');
    const codexGrid = document.getElementById('codexGrid');

    function getCurrentMap() {
      return maps[currentMapIndex];
    }

    function updateCoinUI() {
      coinCount.textContent = `哈弗币：${coinBalance}`;
    }

    function updateMapUI() {
      const map = getCurrentMap();
      buttonTitle.textContent = map.name;
      mapNameTop.textContent = `当前区域：${map.name}`;
      mapCost.textContent = `消耗：${map.cost} 哈弗币`;
      drawButton.setAttribute('aria-label', `进入${map.name}，发放哈弗币并生成三张卡牌`);
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 1800);
    }

    function payoutPendingCoins() {
      if (pendingCoins <= 0) return 0;
      const canReceive = Math.max(0, COIN_CAP - coinBalance);
      const received = Math.min(canReceive, pendingCoins);
      coinBalance += received;
      pendingCoins = 0;
      updateCoinUI();
      return received;
    }

    function pickLoot(table) {
      const totalWeight = table.reduce((sum, item) => sum + item.weight, 0);
      let roll = Math.random() * totalWeight;
      for (const item of table) {
        roll -= item.weight;
        if (roll <= 0) return item;
      }
      return table[table.length - 1];
    }

    function getAudioCtx() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }

    function tone({ type = 'sine', frequency = 440, start = 0, duration = 0.12, gain = 0.05, endFrequency = frequency }) {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const vol = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + start);
      osc.frequency.exponentialRampToValueAtTime(Math.max(30, endFrequency), ctx.currentTime + start + duration);
      vol.gain.setValueAtTime(0.0001, ctx.currentTime + start);
      vol.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + start + 0.015);
      vol.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
      osc.connect(vol).connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration + 0.02);
    }

    function noiseBurst({ duration = 0.2, gain = 0.04 }) {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      }
      const src = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const vol = ctx.createGain();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      src.buffer = buffer;
      vol.gain.setValueAtTime(0.0001, ctx.currentTime);
      vol.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + 0.02);
      vol.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      src.connect(filter).connect(vol).connect(ctx.destination);
      src.start();
    }

    function playFlipSound() {
      tone({ type: 'triangle', frequency: 320, endFrequency: 540, duration: 0.11, gain: 0.04 });
      tone({ type: 'sine', frequency: 460, start: 0.03, endFrequency: 380, duration: 0.09, gain: 0.02 });
    }

    function playGoldSound() {
      tone({ type: 'sine', frequency: 880, duration: 0.16, gain: 0.065, endFrequency: 1180 });
      tone({ type: 'triangle', frequency: 1320, start: 0.04, duration: 0.22, gain: 0.032, endFrequency: 1460 });
    }

    function playRedSound() {
      [660, 990, 1320].forEach((note, index) => {
        tone({ type: 'triangle', frequency: note, start: index * 0.055, duration: 0.22, gain: 0.03, endFrequency: note * 0.98 });
      });
    }

    function playBurnSound() {
      noiseBurst({ duration: 0.26, gain: 0.045 });
      tone({ type: 'sawtooth', frequency: 220, duration: 0.18, gain: 0.018, endFrequency: 110 });
      tone({ type: 'triangle', frequency: 520, start: 0.04, duration: 0.16, gain: 0.012, endFrequency: 260 });
    }

    function iconMarkup(type) {
      const icons = {
        candle: `<svg class="icon-svg" viewBox="0 0 100 100"><rect x="23" y="20" width="54" height="62" rx="7" class="s-dark" opacity="0.12"></rect><rect x="28" y="26" width="44" height="52" rx="6" class="s-light"></rect><rect x="34" y="36" width="32" height="28" rx="4" class="s-mid"></rect><rect x="41" y="46" width="6" height="18" class="s-light"></rect><rect x="53" y="42" width="6" height="22" class="s-light"></rect><path d="M44 33 C42 27, 49 24, 50 18 C55 24, 58 28, 56 33 C54 38, 46 38, 44 33 Z" class="s-dark"></path></svg>`,
        yogurt: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M34 28 H66 L62 76 H38 Z" class="s-light"></path><path d="M30 30 H70" class="stroke"></path><path d="M38 26 C42 18, 58 18, 62 26" class="stroke"></path><path d="M42 48 C47 38, 59 42, 58 53 C57 62, 43 62, 42 48 Z" class="s-mid"></path><circle cx="55" cy="46" r="5" class="s-light"></circle></svg>`,
        hammer: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M28 34 H59 C67 34 72 28 78 28 H82 V45 H55 L46 54 Z" class="s-dark"></path><rect x="42" y="48" width="12" height="36" rx="5" transform="rotate(35 48 66)" class="s-light"></rect><path d="M66 28 L76 18 L82 24 L74 33 Z" class="s-mid"></path></svg>`,
        grinder: `<svg class="icon-svg" viewBox="0 0 100 100"><circle cx="40" cy="56" r="15" class="s-light"></circle><circle cx="40" cy="56" r="8" class="s-mid"></circle><rect x="47" y="43" width="22" height="12" rx="4" transform="rotate(-18 58 49)" class="s-dark"></rect><rect x="61" y="35" width="11" height="28" rx="4" transform="rotate(-18 66 49)" class="s-mid"></rect></svg>`,
        camera: `<svg class="icon-svg" viewBox="0 0 100 100"><rect x="23" y="36" width="54" height="32" rx="8" class="s-dark"></rect><circle cx="50" cy="52" r="13" class="s-light"></circle><circle cx="50" cy="52" r="8" class="s-mid"></circle><rect x="33" y="28" width="16" height="10" rx="3" class="s-mid"></rect><circle cx="67" cy="43" r="3" class="s-light"></circle></svg>`,
        paint: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M34 28 H66 L62 78 H38 Z" class="s-light"></path><path d="M38 28 C40 19, 60 19, 62 28" class="stroke"></path><path d="M42 50 C48 44, 56 44, 60 51 C56 60, 48 65, 41 61 C39 58, 39 54, 42 50 Z" class="s-mid"></path></svg>`,
        cutlass: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M20 67 C42 63, 58 51, 76 24 C77 23, 80 24, 80 26 C68 50, 53 66, 30 76 Z" class="s-light"></path><path d="M32 69 C37 66, 40 68, 44 73 C38 78, 33 79, 27 76 Z" class="s-dark"></path><path d="M43 72 Q53 63 60 72" class="stroke"></path></svg>`,
        horn: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M34 22 C18 34, 16 60, 37 74 C49 82, 66 78, 74 62 C78 55, 80 43, 74 34 C69 27, 62 26, 57 28 C63 37, 61 52, 51 59 C44 64, 36 66, 28 62 C22 49, 25 34, 34 22 Z" class="s-light"></path><path d="M50 37 C55 41, 56 49, 52 54" class="stroke"></path></svg>`,
        coin: `<svg class="icon-svg" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="26" ry="26" class="s-light"></ellipse><ellipse cx="50" cy="50" rx="19" ry="19" class="s-mid"></ellipse><path d="M50 37 L54 46 L64 46 L56 52 L60 62 L50 56 L40 62 L44 52 L36 46 L46 46 Z" class="s-light"></path></svg>`,
        clock: `<svg class="icon-svg" viewBox="0 0 100 100"><rect x="34" y="18" width="32" height="60" rx="10" class="s-dark"></rect><circle cx="50" cy="46" r="14" class="s-light"></circle><circle cx="50" cy="46" r="2.8" class="s-dark"></circle><path d="M50 46 L50 37" class="stroke"></path><path d="M50 46 L58 50" class="stroke"></path></svg>`,
        rolex: `<svg class="icon-svg" viewBox="0 0 100 100"><rect x="42" y="12" width="16" height="16" rx="6" class="s-mid"></rect><rect x="42" y="72" width="16" height="16" rx="6" class="s-mid"></rect><circle cx="50" cy="50" r="22" class="s-light"></circle><circle cx="50" cy="50" r="16" class="s-mid"></circle><path d="M50 50 L50 40" class="stroke"></path><path d="M50 50 L58 55" class="stroke"></path></svg>`,
        goldbar: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M24 60 L38 34 H68 L54 60 Z" class="s-light"></path><path d="M54 60 L68 34 L80 60 Z" class="s-mid"></path><path d="M24 60 H80 L72 72 H32 Z" class="s-dark"></path></svg>`,
        gazelle: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M30 61 C40 49, 54 45, 68 49 C72 53, 73 58, 71 63 C60 69, 45 71, 32 69 Z" class="s-light"></path><path d="M63 42 C64 29, 69 23, 74 18" class="stroke"></path><path d="M57 42 C55 30, 51 24, 46 18" class="stroke"></path></svg>`,
        shell: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M44 18 H56 V62 C56 74, 44 74, 44 62 Z" class="s-light"></path><path d="M44 62 H56 V76 H44 Z" class="s-mid"></path></svg>`,
        reactor: `<svg class="icon-svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="10" class="s-dark"></circle><path d="M50 23 C63 23, 70 32, 70 42 C62 46, 56 50, 50 50 C48 41, 45 34, 50 23 Z" class="s-light"></path><path d="M28 61 C22 49, 26 39, 34 34 C42 38, 48 41, 50 50 C42 54, 35 59, 28 61 Z" class="s-light"></path><path d="M72 61 C58 65, 48 61, 44 53 C48 45, 51 40, 50 50 C57 51, 65 55, 72 61 Z" class="s-light"></path></svg>`,
        champagne: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M36 20 H64 C64 42 59 52 50 58 C41 52 36 42 36 20 Z" class="s-light"></path><path d="M50 58 V75" class="stroke"></path><path d="M42 80 H58" class="stroke"></path></svg>`,
        bust: `<svg class="icon-svg" viewBox="0 0 100 100"><circle cx="50" cy="32" r="13" class="s-light"></circle><path d="M34 60 C39 48, 61 48, 66 60 L71 76 H29 Z" class="s-mid"></path></svg>`,
        gramophone: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M61 20 C79 20, 82 44, 66 49 C56 52, 48 47, 44 41 C50 33, 54 28, 61 20 Z" class="s-light"></path><rect x="44" y="43" width="8" height="16" class="s-mid"></rect><rect x="32" y="59" width="36" height="14" rx="3" class="s-dark"></rect></svg>`,
        ifv: `<svg class="icon-svg" viewBox="0 0 100 100"><rect x="26" y="47" width="42" height="18" rx="6" class="s-dark"></rect><rect x="44" y="39" width="18" height="10" rx="3" class="s-mid"></rect><rect x="58" y="42" width="18" height="4" rx="2" class="s-light"></rect><circle cx="36" cy="69" r="7" class="s-light"></circle><circle cx="50" cy="69" r="7" class="s-light"></circle><circle cx="64" cy="69" r="7" class="s-light"></circle></svg>`,
        robot: `<svg class="icon-svg" viewBox="0 0 100 100"><circle cx="50" cy="52" r="22" class="s-light"></circle><circle cx="42" cy="50" r="4" class="s-dark"></circle><circle cx="58" cy="50" r="4" class="s-dark"></circle><path d="M38 61 Q50 68 62 61" class="stroke"></path><path d="M50 20 V30" class="stroke"></path></svg>`,
        squarecoin: `<svg class="icon-svg" viewBox="0 0 100 100"><rect x="25" y="25" width="50" height="50" rx="10" class="s-light"></rect><rect x="40" y="40" width="20" height="20" rx="4" class="s-mid"></rect><path d="M25 50 H75" class="stroke" opacity="0.4"></path></svg>`,
        crown: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M24 68 L32 35 L49 52 L66 31 L76 68 Z" class="s-light"></path><rect x="26" y="68" width="48" height="10" rx="3" class="s-mid"></rect></svg>`,
        board: `<svg class="icon-svg" viewBox="0 0 100 100"><rect x="26" y="26" width="48" height="48" rx="4" class="s-light"></rect><path d="M42 26 V74 M58 26 V74 M26 42 H74 M26 58 H74" class="stroke"></path></svg>`,
        satdish: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M28 64 C28 45, 44 30, 63 30 C63 49, 48 64, 28 64 Z" class="s-light"></path><path d="M57 56 L70 69" class="stroke"></path><path d="M68 70 H80" class="stroke"></path><path d="M61 40 C67 41, 72 46, 73 52" class="stroke"></path></svg>`,
        rocketfuel: `<svg class="icon-svg" viewBox="0 0 100 100"><rect x="36" y="24" width="28" height="50" rx="8" class="s-light"></rect><path d="M36 40 H64" class="stroke" opacity="0.4"></path><path d="M43 74 L39 84" class="stroke"></path><path d="M57 74 L61 84" class="stroke"></path><path d="M50 17 C56 22, 58 28, 50 33 C42 28, 44 22, 50 17 Z" class="s-mid"></path></svg>`,
        apcbattery: `<svg class="icon-svg" viewBox="0 0 100 100"><rect x="24" y="32" width="52" height="34" rx="6" class="s-light"></rect><rect x="76" y="42" width="6" height="14" rx="2" class="s-mid"></rect><rect x="34" y="26" width="8" height="8" rx="2" class="s-mid"></rect><rect x="58" y="26" width="8" height="8" rx="2" class="s-mid"></rect><path d="M46 42 L40 52 H48 L44 60 L58 48 H50 L54 42 Z" class="s-dark"></path></svg>`,
        heartgem: `<svg class="icon-svg" viewBox="0 0 100 100"><path d="M50 79 L24 48 C17 39, 20 24, 34 22 C42 21, 47 25, 50 31 C53 25, 58 21, 66 22 C80 24, 83 39, 76 48 Z" class="s-light"></path><circle cx="50" cy="51" r="9" class="s-mid"></circle></svg>`
      };
      return icons[type] || `<div style="font-size:28px;color:#fff">?</div>`;
    }

    function renderCodex() {
      codexGrid.innerHTML = '';
      RED_ITEMS.forEach((item) => {
        const unlocked = discoveredRedItems.has(item.name);
        const div = document.createElement('article');
        div.className = `codex-item${unlocked ? '' : ' locked'}`;
        if (unlocked) {
          div.innerHTML = `
            <div class="codex-icon">${iconMarkup(item.icon)}</div>
            <div class="codex-name">${item.name}</div>
            <div class="codex-price">${item.coins} 哈弗币</div>
          `;
        } else {
          div.innerHTML = `
            <div class="codex-icon">???</div>
            <div class="codex-name">???</div>
            <div class="codex-price">???</div>
          `;
        }
        codexGrid.appendChild(div);
      });
    }

    function createCard(item) {
      const card = document.createElement('article');
      card.className = 'game-card';
      card.dataset.state = 'back';
      card.dataset.counted = 'false';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${item.name} 卡牌`);

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-back tactical-frame"></div>
          <div class="card-face card-front tactical-frame ${item.bg}" lang="zh-CN">
            <div class="card-topline"><span>LOOT</span><span>${item.rarity}</span></div>
            <div class="icon-wrap">${iconMarkup(item.icon)}</div>
            <div class="item-name">${item.name}</div>
            <div class="rarity-tag">TAC-SUPPLY</div>
          </div>
          <div class="burn-layer" aria-hidden="true">
            <span class="flame f1"></span>
            <span class="flame f2"></span>
            <span class="flame f3"></span>
          </div>
        </div>
      `;

      const activate = () => {
        if (card.classList.contains('removing')) return;
        if (card.dataset.state === 'back') {
          card.dataset.state = 'front';
          card.classList.add('flipped');
          playFlipSound();
          if (card.dataset.counted === 'false') {
            pendingCoins += item.coins;
            card.dataset.counted = 'true';
          }
          if (item.bg === 'bg-red') {
            discoveredRedItems.add(item.name);
            renderCodex();
          }
        } else {
          card.dataset.state = 'gone';
          card.classList.add('removing');
          playBurnSound();
          setTimeout(() => card.remove(), 420);
        }
      };

      card.addEventListener('click', activate);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activate();
        }
      });

      return card;
    }

    function enterCurrentMap() {
      const map = getCurrentMap();
      payoutPendingCoins();

      if (coinBalance < map.cost) {
        showToast('哈弗币不足');
        return;
      }

      if (map.cost > 0) {
        coinBalance -= map.cost;
        updateCoinUI();
      }

      cardsArea.innerHTML = '';
      const picks = [pickLoot(map.loot), pickLoot(map.loot), pickLoot(map.loot)];
      picks.forEach((item) => cardsArea.appendChild(createCard(item)));
      cardsArea.classList.remove('hidden');

      if (picks.some((item) => item.bg === 'bg-gold')) {
        setTimeout(playGoldSound, 180);
      }
      if (picks.some((item) => item.bg === 'bg-red')) {
        setTimeout(playRedSound, 320);
      }
    }

    drawButton.addEventListener('click', enterCurrentMap);
    prevMap.addEventListener('click', () => {
      currentMapIndex = (currentMapIndex - 1 + maps.length) % maps.length;
      updateMapUI();
    });
    nextMap.addEventListener('click', () => {
      currentMapIndex = (currentMapIndex + 1) % maps.length;
      updateMapUI();
    });

    codexButton.addEventListener('click', () => {
      renderCodex();
      codexOverlay.classList.add('open');
      codexOverlay.setAttribute('aria-hidden', 'false');
    });

    codexClose.addEventListener('click', () => {
      codexOverlay.classList.remove('open');
      codexOverlay.setAttribute('aria-hidden', 'true');
    });

    codexOverlay.addEventListener('click', (event) => {
      if (event.target === codexOverlay) {
        codexOverlay.classList.remove('open');
        codexOverlay.setAttribute('aria-hidden', 'true');
      }
    });

    updateCoinUI();
    updateMapUI();
    renderCodex();