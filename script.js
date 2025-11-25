// --- DATA AKURAT SIKLUS 60 TAHUN (Jia Zi) ---
// Urutan array dimulai dari Jia Zi (0) sampai Gui Hai (59).
// 1924 & 1984 adalah tahun Jia Zi (Index 0).
const sixtyCycleWeights = [
    1.2, 0.9, 0.6, 0.7, 1.2, 0.5, 0.9, 0.6, 0.7, 0.8, // 0-9
    1.5, 0.9, 1.6, 0.8, 0.8, 1.9, 1.2, 0.6, 0.8, 0.7, // 10-19
    0.5, 1.5, 0.6, 1.6, 1.5, 0.7, 1.2, 1.2, 1.0, 0.7, // 20-29
    1.5, 0.6, 0.5, 1.4, 1.4, 0.7, 0.7, 0.7, 0.9, 1.2, // 30-39
    0.8, 0.7, 1.3, 0.5, 1.4, 0.5, 0.9, 1.7, 0.5, 0.7, // 40-49
    1.2, 0.8, 0.8, 0.6, 0.9, 0.6, 0.8, 1.6, 1.0, 1.6  // 50-59
];

// Nama Shio & Elemen untuk UI Helper
const stems = ["Kayu", "Kayu", "Api", "Api", "Tanah", "Tanah", "Logam", "Logam", "Air", "Air"];
const branches = ["Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing", "Monyet", "Ayam", "Anjing", "Babi"];

function getCycleInfo(year) {
    // 1924 is start of cycle (Index 0)
    let offset = (year - 1924) % 60;
    if (offset < 0) offset += 60;
    
    const stem = stems[offset % 10];
    const branch = branches[offset % 12];
    return {
        weight: sixtyCycleWeights[offset],
        name: `${branch} ${stem}`
    };
}

// Bobot Tanggal (Imlek 1-30)
const dayWeightsMap = {
    1: 0.5, 2: 1.0, 3: 0.8, 4: 1.5, 5: 1.6,
    6: 1.5, 7: 0.8, 8: 1.6, 9: 0.8, 10: 1.6,
    11: 0.9, 12: 1.7, 13: 0.8, 14: 1.7, 15: 1.0,
    16: 0.8, 17: 0.9, 18: 1.8, 19: 0.5, 20: 1.5,
    21: 1.0, 22: 0.9, 23: 0.8, 24: 0.9, 25: 1.5,
    26: 1.8, 27: 0.7, 28: 0.8, 29: 1.6, 30: 0.6
};

// Interpretasi (Syair & Arti)
const prophecies = {
    "2.1": { poem: "Hidup penuh derita dan air mata, nasib buruk seolah tak berujung.", meaning: "Nasib sangat kurang beruntung. Kesulitan datang silih berganti. Disarankan banyak beramal dan berdoa untuk mengubah karma." },
    "2.2": { poem: "Tubuh dingin tulang kedinginan, pahit getir tiada tara.", meaning: "Kehidupan penuh perjuangan berat. Usaha sering gagal. Perlu ketabahan luar biasa." },
    "2.3": { poem: "Nasib bagai daun kering tertiup angin, tak tentu arah tujuan.", meaning: "Pekerjaan dan tempat tinggal sering berpindah-pindah. Sulit menabung atau membangun fondasi." },
    "2.4": { poem: "Rezeki tipis, keluarga sulit diandalkan.", meaning: "Tidak ada bantuan dari kerabat. Harus berjuang sendiri dengan tangan kosong. Masa tua mungkin kesepian jika tidak hati-hati." },
    "2.5": { poem: "Lahir dari keluarga sederhana, merintis dari nol.", meaning: "Masa muda sulit, namun ada peluang kecil untuk perbaikan jika bekerja sangat keras. Jangan bergantung pada warisan." },
    "2.6": { poem: "Berjuang sendiri melawan badai, tiada tempat berteduh.", meaning: "Sangat mandiri karena keadaan. Sukses kecil mungkin dicapai, tapi dengan pengorbanan besar." },
    "2.7": { poem: "Rezeki datang dan pergi, bagai air pasang surut.", meaning: "Uang mudah didapat tapi mudah habis. Perlu manajemen keuangan yang sangat ketat agar masa tua aman." },
    "2.8": { poem: "Pindah tempat adalah kunci, di rantau mungkin ada harapan.", meaning: "Tidak cocok tinggal di tanah kelahiran. Pindah kota atau negara lain bisa membawa peruntungan lebih baik." },
    "2.9": { poem: "Awalnya pahit, akhirnya mungkin manis sedikit.", meaning: "Masa muda penuh cobaan. Jika tabah, usia 40 ke atas akan sedikit lebih tenang." },
    "3.0": { poem: "Bekerja keras seumur hidup, hasil hanya cukup makan.", meaning: "Tipe pekerja keras. Tidak akan kaya raya, tapi tidak akan kelaparan asalkan rajin." },
    "3.1": { poem: "Kesulitan di awal, kemudahan di akhir.", meaning: "Fase pertama kehidupan berat. Namun, kerja keras akan membuahkan hasil lumayan di usia paruh baya." },
    "3.2": { poem: "Angin keberuntungan jarang berhembus.", meaning: "Peluang emas jarang datang. Harus pandai menangkap kesempatan sekecil apapun." },
    "3.3": { poem: "Pagi cerah, sore mendung.", meaning: "Awal karir terlihat bagus, namun hati-hati kebangkrutan di usia pertengahan. Jaga aset dengan baik." },
    "3.4": { poem: "Banyak halangan dalam karir, namun keluarga harmonis.", meaning: "Karir biasa saja, tapi kehidupan rumah tangga cukup damai. Ketenangan batin lebih utama." },
    "3.5": { poem: "Rezeki pas-pasan, tapi hati tenang.", meaning: "Hidup sederhana. Tidak kaya harta, tapi kaya hati. Cukup untuk kebutuhan sehari-hari." },
    "3.6": { poem: "Gelombang hidup naik turun, perlu nahkoda yang kuat.", meaning: "Hidup penuh drama dan perubahan. Kadang di atas, kadang di bawah. Perlu mental baja." },
    "3.7": { poem: "Ada bantuan dari orang tak dikenal.", meaning: "Meskipun sulit, sering ada 'dewa penolong' di saat kritis. Rezeki lumayan lancar." },
    "3.8": { poem: "Matahari bersinar setelah hujan badai.", meaning: "Masa muda sangat sulit, mungkin sakit-sakitan atau miskin. Tapi usia 30-an ke atas akan bangkit sukses." },
    "3.9": { poem: "Usaha sendiri tanpa modal, hasil memuaskan.", meaning: "Seniman atau pengusaha mandiri. Berpotensi sukses dari bakat alami." },
    "4.0": { poem: "Nasib panjang umur, rezeki mengalir tenang.", meaning: "Hidup stabil. Tidak ada gejolak besar. Rezeki cukup dan umur panjang." },
    "4.1": { poem: "Pintar mencari uang, tapi boros.", meaning: "Berbakat dalam bisnis. Uang masuk deras, tapi harus belajar menabung." },
    "4.2": { poem: "Dihormati orang, karir birokrasi atau pemimpin.", meaning: "Cocok jadi pegawai negeri atau manajer. Hidup cukup terjamin dan punya status sosial." },
    "4.3": { poem: "Bunga bermekaran di musim semi.", meaning: "Orang yang sangat beruntung. Cerdas, menarik, dan mudah disukai orang. Rezeki lancar." },
    "4.4": { poem: "Segala keinginan mudah tercapai.", meaning: "Jarang mengalami kesulitan berarti. Hati-hati jangan sampai sombong." },
    "4.5": { poem: "Keluarga bahagia, anak cucu berbakti.", meaning: "Fokus kebahagiaan ada pada keluarga. Masa tua sangat menyenangkan dikelilingi cucu." },
    "4.6": { poem: "Perantau sukses, pulang bawa emas.", meaning: "Harus merantau jauh. Sukses besar menanti di negeri orang." },
    "4.7": { poem: "Nasib mujur di usia tua.", meaning: "Muda berjuang, tua menikmati hasil. Aset properti akan banyak." },
    "4.8": { poem: "Pejabat tinggi atau pengusaha besar.", meaning: "Punya bakat memimpin. Potensi kekayaan sangat tinggi. Dihormati masyarakat." },
    "4.9": { poem: "Kaya raya turun temurun.", meaning: "Membawa hoki bagi keluarga. Status sosial tinggi dan kehidupan mewah." },
    "5.0": { poem: "Keseimbangan sempurna antara harta dan tahta.", meaning: "Hidup makmur. Karir bagus, keuangan bagus. Sedikit masalah kesehatan, tapi bisa diatasi." },
    "5.1": { poem: "Kejayaan datang bertubi-tubi.", meaning: "Apapun yang dikerjakan jadi emas. Sangat sukses dalam perdagangan." },
    "5.2": { poem: "Kekuasaan di tangan, rezeki di kantong.", meaning: "Sangat berwibawa. Orang segan padamu. Cocok di bidang hukum atau militer." },
    "5.3": { poem: "Panen raya sepanjang tahun.", meaning: "Rezeki tidak pernah putus. Hidup nyaman dan mewah." },
    "5.4": { poem: "Terpelajar dan kaya.", meaning: "Sukses lewat jalur akademis atau keahlian khusus. Dihormati karena ilmu dan hartanya." },
    "5.5": { poem: "Raja kecil di daerah sendiri.", meaning: "Sangat berpengaruh di lingkungan. Sukses, kaya, dan berkuasa." },
    "5.6": { poem: "Nasib sempurna jarang ada tandingannya.", meaning: "Semua aspek hidup (jodoh, karir, kesehatan) sangat baik." },
    "5.7": { poem: "Diberkati langit dengan keberuntungan.", meaning: "Nama harum dikenal banyak orang. Prestasi luar biasa." },
    "5.8": { poem: "Kekayaan melimpah ruah.", meaning: "Tingkat kekayaan konglomerat. Harta tak habis tujuh turunan." },
    "5.9": { poem: "Puncak kejayaan manusia.", meaning: "Sangat langka. Jabatan tinggi, harta melimpah, dihormati semua orang." },
    "6.0": { poem: "Emas permata memenuhi gudang.", meaning: "Sangat kaya. Fokus hidup adalah mengelola kekayaan dan filantropi." },
    "6.1": { poem: "Nama tercatat dalam sejarah.", meaning: "Akan melakukan sesuatu yang besar yang diingat banyak orang. Sukses dan terkenal." },
    "6.2": { poem: "Kemuliaan tanpa batas.", meaning: "Posisi sangat tinggi di pemerintahan atau korporasi global." },
    "6.3": { poem: "Pemimpin bijaksana nan kaya.", meaning: "Kombinasi kekayaan materi dan kebijaksanaan spiritual." },
    "6.4": { poem: "Kedudukan setara menteri.", meaning: "Otoritas sangat besar. Hidup dalam kemewahan mutlak." },
    "6.5": { poem: "Pilar negara dan masyarakat.", meaning: "Sangat penting bagi orang banyak. Kekayaan dan kekuasaan sangat besar." },
    "6.6": { poem: "Harta karun tak ternilai.", meaning: "Kekayaan tak terhitung. Hidup bagai raja." },
    "6.7": { poem: "Legenda di masa hidupnya.", meaning: "Pencapaian luar biasa dalam bidang yang ditekuni." },
    "6.8": { poem: "Kebahagiaan surgawi di dunia.", meaning: "Jarang ada masalah. Hidup mulus seperti jalan tol." },
    "6.9": { poem: "Bintang paling terang di langit.", meaning: "Nasib terbaik dari yang terbaik. Kemuliaan absolut." },
    "7.0": { poem: "Raja di atas raja.", meaning: "Puncak tertinggi nasib manusia. (Sangat Langka)" },
    "7.1": { poem: "Nasib Kaisar.", meaning: "Hanya dimiliki tokoh-tokoh pengubah dunia. Sangat langka." },
    "7.2": { poem: "Langit dan Bumi bersatu.", meaning: "Level spiritual dan material tertinggi." }
};

const defaultProphecy = {
    poem: "Data spesifik tidak ditemukan untuk bobot ini.",
    meaning: "Silakan cek kembali input tanggal lahir Anda."
};

// --- INIT ---
window.onload = function() {
    populateYears();
    populateDays();
};

function populateYears() {
    const select = document.getElementById('yearInput');
    // Populate from 1924 to 2030
    for (let y = 1924; y <= 2030; y++) {
        let info = getCycleInfo(y);
        let opt = document.createElement('option');
        opt.value = info.weight;
        // Format: 1990 - Kuda Logam (Bobot: 0.9)
        opt.text = `${y} - ${info.name} (Bobot: ${info.weight})`;
        select.appendChild(opt);
    }
    // Set default to roughly middle year 1990
    for(let i=0; i<select.options.length; i++) {
        if(select.options[i].text.startsWith("1990")) {
            select.selectedIndex = i;
            break;
        }
    }
}

function populateDays() {
    const select = document.getElementById('dayInput');
    for (let d = 1; d <= 30; d++) {
        let opt = document.createElement('option');
        let w = dayWeightsMap[d];
        opt.value = w;
        opt.text = `Tanggal ${d} Imlek (Bobot: ${w})`;
        select.appendChild(opt);
    }
}

// --- CALCULATION LOGIC ---
function calculateFortune() {
    const yearW = parseFloat(document.getElementById('yearInput').value);
    const monthW = parseFloat(document.getElementById('monthInput').value);
    const dayW = parseFloat(document.getElementById('dayInput').value);
    const timeW = parseFloat(document.getElementById('timeInput').value);

    if (isNaN(yearW) || isNaN(monthW) || isNaN(dayW) || isNaN(timeW)) {
        alert("Mohon lengkapi semua data (Tahun, Bulan, Tanggal, dan Jam).");
        return;
    }

    // Calculate Total
    // Fix floating point precision issues
    let total = (yearW * 10 + monthW * 10 + dayW * 10 + timeW * 10) / 10;
    let totalStr = total.toFixed(1);

    // Get Prophecy
    let data = prophecies[totalStr];
    
    // Handling range if exact match not found
    if (!data) {
        if (total < 2.1) data = prophecies["2.1"];
        else if (total > 7.1) data = prophecies["7.1"];
        else data = defaultProphecy;
    }

    // Display
    document.getElementById('totalWeightDisplay').innerText = totalStr;
    document.getElementById('poemText').innerText = `"${data.poem}"`;
    document.getElementById('meaningText').innerText = data.meaning;

    // Show Result Section
    const resultDiv = document.getElementById('resultSection');
    resultDiv.classList.remove('hidden');
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}