let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`“${pickRandom(global.quotes)}”`, m)
}
handler.help = ['quotes']
handler.tags = ['quotes']
handler.command = /^(quotes)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

// https://jalantikus.com/tips/kata-kata-bucin/
global.quotes = [
    "Segala sesuatu memiliki kesudahan, yang sudah berakhir biarlah berlalu dan yakinlah semua akan baik-baik saja", 
    "Setiap detik sangatlah berharga karena waktu mengetahui banyak hal, termasuk rahasia hati.", 
    "Jika kamu tak menemukan buku yang kamu cari di rak, maka tulislah sendiri.",
    "Jika hatimu banyak merasakan sakit, maka belajarlah dari rasa sakit itu untuk tidak memberikan rasa sakit pada orang lain.",
    "Hidup tak selamanya tentang pacar.",
    "Rumah bukan hanya sebuah tempat, tetapi itu adalah perasaan.",
    "Pilih mana: Orang yang memimpikan kesuksesan atau orang yang membuatnya menjadi kenyataan?",
    "Kamu mungkin tidak bisa menyiram bunga yang sudah layu dan berharap ia akan mekar kembali, tapi kamu bisa menanam bunga yang baru dengan harapan yang lebih baik dari sebelumnya.",
    "Bukan bahagia yang menjadikan kita bersyukur, tetapi dengan bersyukurlah yang akan menjadikan hidup kita bahagia.",
    "Aku memang diam. Tapi aku tidak buta.",
    "Keyakinan merupakan suatu pengetahuan di dalam hati, jauh tak terjangkau oleh bukti.",
    "Rasa bahagia dan tak bahagia bukan berasal dari apa yang kamu miliki, bukan pula berasal dari siapa diri kamu, atau apa yang kamu kerjakan. Bahagia dan tak bahagia berasal dari pikiran kamu.",
    "Sakit dalam perjuangan itu hanya sementara. Bisa jadi kamu rasakan dalam semenit, sejam, sehari, atau setahun. Namun jika menyerah, rasa sakit itu akan terasa selamanya.",
    "Hanya seseorang yang takut yang bisa bertindak berani. Tanpa rasa takut itu tidak ada apapun yang bisa disebut berani.",
    "Jadilah diri kamu sendiri. Siapa lagi yang bisa melakukannya lebih baik ketimbang diri kamu sendiri?",
    "Kesempatan kamu untuk sukses di setiap kondisi selalu dapat diukur oleh seberapa besar kepercayaan kamu pada diri sendiri.",
    "Kebanggaan kita yang terbesar adalah bukan tidak pernah gagal, tetapi bangkit kembali setiap kali kita jatuh.",
    "Suatu pekerjaan yang paling tak kunjung bisa diselesaikan adalah pekerjaan yang tak kunjung pernah dimulai.",
    "Pikiran kamu bagaikan api yang perlu dinyalakan, bukan bejana yang menanti untuk diisi.",
    "Kejujuran adalah batu penjuru dari segala kesuksesan. Pengakuan adalah motivasi terkuat. Bahkan kritik dapat membangun rasa percaya diri saat “disisipkan” di antara pujian.",
    "Hidup ini hanya sekali dan peluang itu juga sekali munculnya, keduanya tidak datang dua kali.",
    "Karena perjuangan adalah tanda perjalananmu menuju sukses.",
    "Dunia tak lagi sama tak selamanya memihak kita, di saat kita mau berusaha di situlah kebahagiaan akan indah pada waktunya.",
    "Hidup tak semudah membalikkan telapak tangan, tetapi dengan telapak tangan kita dapat mengubah hidup kita jauh lebih baik lagi.",
    "Jadilah pribadi yang menantang masa depan, bukan pengecut yang aman di zona nyaman.",
    "Belajarlah rendah hati, rendahkan hatimu serendah-rendahnya hingga tidak ada seorangpun yang bisa merendahkanmu.",
    "Keyakinan merupakan suatu pengetahuan di dalam hati, jauh tak terjangkau oleh bukti.",
    "Sakit dalam perjuangan itu hanya sementara. Bisa jadi kamu rasakan dalam semenit, sejam, sehari, atau setahun. Namun jika menyerah, rasa sakit itu akan terasa selamanya.",
    "Kekuatan dan perkembangan datang hanya dari usaha dan perjuangan yang terus menerus.",
    "Pengusaha itu bukan orang yang pintar tetapi mereka pintar mencari orang pintar.",
    "Hidup itu sebentar. Kamu harus bisa tersenyum saat merasakan kepedihan atau kita tak akan pernah melanjutkan hidup.",
    "Yang keren itu bukan anak muda yang banyak gaya, tapi anak muda yang banyak karya.",
    "Hanya seseorang yang takut yang bisa bertindak berani. Tanpa rasa takut itu tidak ada apapun yang bisa disebut berani.",
    "Siapapun yang berusaha menjatuhkanmu memang sudah berada di bawahmu.",
    "Kesuksesan dan kegagalan adalah sama-sama bagian dalam hidup. Keduanya hanyalah sementara.",
    "Ia yang mengerjakan lebih dari apa yang dibayar pada suatu saat akan dibayar lebih dari apa yang ia kerjakan.",
    "Rahasia dari kesuksesan kita adalah bahwa kita tidak pernah menyerah.",
    "Karena hidup adalah pilihan.",
    "Memaafkan belum tentu membuat kita lebih baik atau bahkan merasa lebih baik tetapi yang jelas membuka jalan kebaikan.",
    "Memaafkan belum tentu membuat kita lebih baik atau bahkan merasa lebih baik, tetapi yang jelas membuka jalan kebaikan.",
    "Ujian kesetiaan selalu datang setiap hari, pastikan kamu setia kepada orang yang tepat.",
    "Aku tak ingin membuatmu rindu padaku. Karena rindu itu artinya sedih. Dan aku tak ingin menjadi alasanmu bersedih.",
    "Aku memilih memandangimu daripada segala lukisan yang ada di dunia.",
    "Relasi itu seperti bunga yang membutuhkan air, bisa kering dan mati tanpa komunikasi.",
    "Akan lebih baik bersabar menunggu seseorang datang menyapa daripada mengharapkan dia yang memilih pergi untuk kembali.",
    "Mencintai itu butuh tenaga, jangan kau buang tenagamu untuk berlari dan menyerah.",
    "Percayalah, jika dia memang cinta sejati kau, mau semenyakitkan apa pun, mau seberapa sulit liku yang harus dilalui, dia tetap akan bersama kau kelak, suatu saat nanti.",
    "Cinta itu mempunyai kesanggupan yang hebat. Dia bisa membuat binatang menjadi manusia, dan manusia menjadi binatang.",
    "Jauh sebelum aku bertemu denganmu, aku telah mengenalmu dalam doaku.",
    "Cinta merupakan sesuatu yang indah, ia laksana sebuah lukisan di awan, cerah membingkai ufuk senja.",
    "Semoga kelak selimutku adalah kamu yang senantiasa menghangatkanku di kala dingin menyerang tubuh dan jiwaku.",
    "Aku menginginkanmu seutuhnya, selamanya, kamu dan aku, setiap hari.",
    "Cinta itu burung yang indah, yang mengemis untuk ditangkap tapi menolak untuk dilukai.",
    "Karena cinta, duri menjadi mawar. Karena cinta, cuka menjelma anggur segar.",
    "Cinta tak berupa tatapan satu sama lain, tetapi memandang keluar bersama ke arah yang sama.",
    "Cinta tidak terlihat dengan mata, tetapi dengan hati.",
    "Kau pikir aku memperhatikanmu? Tidak, Sayang. Aku memperhatikan lingkunganmu, barangkali ada yang akan mengganggumu, kuhajar dia.",
    "Cinta tidak pernah menuntut, cinta selalu memberi. Cinta selalu menderita, tanpa pernah meratap, tanpa pernah mendendam.",
    "Cinta itu layaknya angin, aku tidak bisa melihatnya tetapi aku bisa merasakannya.",
    "Cinta bukanlah bertahan seberapa lama. Tetapi seberapa jelas dan ke arah mana.",
    "Sahabat yang baik tidak akan mencelakai, tetapi sahabat yang baik akan menasehati, melindungi, dan tulus mengasihi.",
    "Hal terindah dari persahabatan adalah memahami dan dipahami, tanpa pernah memaksa dan ingin menang sendiri.",
    "Jika kau mendapat sahabat sejati yang tak luntur baik dalam keadaan suka ataupun duka. Berjanjilah dalam hatimu untuk selalu setia padanya.",
    "Persahabatan tidak perlu saling mengerti. Karena sahabat akan saling menerima hal yang tak bisa dimengerti.",
    "Sahabat bukan mereka yang menghampirimu ketika butuh, namun mereka yang tetap bersamamu ketika seluruh dunia menjauh.",
    "Persahabatan sejati itu layaknya kesehatan, nilainya baru kita sadari setelah kita kehilangannya.",
    "Lebih baik ku menemani sahabat di kala sendiri daripada menemani kekasih yang tak mempunyai waktu untukku di kala ku sendiri dalam sepi.",
    "Bersahabat bukan berarti kita mempercayainya, tapi bersahabat bagaimana kita dapat dipercaya olehnya. Kepercayaan itu penting.",
    "Sahabat adalah orang yang akan membangunkan kita dari tidur walaupun sedang bermimpi indah.",
    "Ketika dalam kesulitan, mereka menghilang, ketika dalam kebahagiaan, mereka datang dengan riang. Tidak, mereka bukan teman!",
    "Setiap orang berbeda, unik dengan caranya. Kamu harus menghargainya, tapi tak berarti kamu harus menyukai semuanya.",
    "Sahabat itu seperti halnya mata dan tangan. Saat mata menangis tangan mengusap, saat tangan terluka mata menangis.",
    "Persahabatan yang didasari oleh keikhlasan hati dan kasih sayang, akan melahirkan keabadian dalam kebersamaan.",
    "Jika kau mendapat sahabat sejati yang tak luntur baik dalam keadaan suka ataupun duka. Berjanjilah dalam hatimu untuk selalu setia padanya.",
    "Bila esok tiba aku ingin seperti hari-hari sebelumnya. Hari-hari bersama sahabat dan teman-teman untuk bisa bersama melakukan hal-hal positif yang menyenangkan.",
    "Apabila engkau menginginkan kemuliaan maka carilah sahabat dari orang orang yang takut kepada Allah subhanahu wataa'la.",
    "Bisa jadi semua teman kita pergi, tapi tidak dengan sahabat",
    "Persahabatan itu motivasi dan inspirasi, bukan hanya gengsi dan basa-basi.",
    "Tak ada yang terasa semengerikan dulu saat kau sudah punya teman sejati.",
    "Persahabatan tak terjalin dengan orang yang istimewa. Kita jadi istimewa karena bersahabat. Sahabatlah yang mengistimewakan kita."]