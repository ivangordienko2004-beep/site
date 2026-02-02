// src/data/projects.ts
export type Project = {
  slug: string;
  title: string;
  summary: string;
  date?: string; // YYYY-MM-DD (заполним позже)
  tags: string[]; // canonical: song | duet | clip | solo | patriotic
  roles: string[];
  cover?: string;
  links?: { youtube?: string; vk?: string; mp3?: string; yandex?: string };
  credits?: { poet?: string; music?: string; performers?: string[] };
};

export const projects: Project[] = [
  {
    slug: "rossiya",
    title: "Россия",
    summary: "Вокальная композиция",
    date: "",
    tags: ["song", "clip", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/rossiya.png",
    links: { youtube: "https://youtu.be/cNcJVExKgiQ?feature=shared" },
    credits: { poet: "Матвей Горбанёв", music: "Дмитрий Дунаев", performers: ["Анастасия Францева"] }
  },
  {
    slug: "soldaty",
    title: "Солдаты",
    summary: "Вокальная композиция",
    date: "",
    tags: ["song", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/soldaty.png",
    links: { youtube: "https://youtu.be/UjTUYs-Tkq8?si=PhQOEjPDOUQbRGNW" },
    credits: { poet: "Михаил Михайлов", music: "Валентин Овсянников", performers: ["Анастасия Францева"] }
  },
  {
    slug: "rebyata-zhuravlyata",
    title: "Ребята Журавлята",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet"],
    roles: ["Вокал"],
    cover: "/images/projects/rebyata-zhuravlyata.png",
    links: { youtube: "https://youtu.be/3RQJw82nrYM?si=bKlufRxZZnWG2R1w" },
    credits: { poet: "Дмитрий Лик", music: "Дмитрий Дунаев", performers: ["Анастасия Францева", "Дмитрий Дунаев"] }
  },
  {
    slug: "imena",
    title: "Имена",
    summary: "Композиция из сборника «СВОи песни»",
    date: "",
    tags: ["song", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/imena.png",
    links: { yandex: "" },
    credits: { poet: "Дмитрий Лик", music: "Дмитрий Дунаев", performers: ["Анастасия Францева"] }
  },
  {
    slug: "neopalimye-serdca",
    title: "Неопалимые сердца",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet"],
    roles: ["Вокал"],
    cover: "/images/projects/neopalimye-serdca.png",
    links: { youtube: "https://youtu.be/RUmdeXz4_HA?si=Nae1rahgJxqQfpVY" },
    credits: { poet: "Алан Салбиев", music: "Дмитрий Дунаев", performers: ["Анастасия Францева", "Дмитрий Дунаев"] }
  },
  {
    slug: "pobeda-budet",
    title: "Победа будет!",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/pobeda-budet.png",
    links: { youtube: "https://youtu.be/N4TAkZGTtt8?si=CmABtpqHFP7IUgiC" },
    credits: { poet: "Дмитрий Лик", music: "Дмитрий Дунаев", performers: ["Анастасия Францева", "Дмитрий Дунаев"] }
  },
  {
    slug: "kadetskiy-vals",
    title: "Кадетский вальс",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet"],
    roles: ["Вокал"],
    cover: "/images/projects/kadetskiy-vals.png",
    links: { youtube: "https://youtu.be/Edpx7SAQrDA?si=bBjetI9Weu40vYOU" },
    credits: { poet: "Андрей Алексеев", music: "Дмитрий Дунаев", performers: ["Анастасия Францева", "Дмитрий Дунаев"] }
  },
  {
    slug: "zhgi",
    title: "Жги",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet"],
    roles: ["Вокал"],
    cover: "/images/projects/zhgi.png",
    links: { youtube: "https://youtu.be/ofJHUd_Zf9o?si=hxrq2uW76FQdWiL_" },
    credits: { poet: "Дмитрий Лик", music: "Дмитрий Дунаев", performers: ["Анастасия Францева", "Дмитрий Дунаев"] }
  },
  {
    slug: "leningrad-kak-sudba",
    title: "Ленинград, как судьба!",
    summary: "Песня о Ленинграде",
    date: "",
    tags: ["song", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/leningrad-kak-sudba.png",
    links: { youtube: "https://youtu.be/AXdempZbHHQ?si=uTAnhugiJXW0LVGA" },
    credits: { poet: "Матвей Горбанёв", music: "Дмитрий Дунаев", performers: ["Анастасия Францева"] }
  },
  {
    slug: "pomyanem",
    title: "Помянем!",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/pomyanem.png",
    links: { youtube: "https://youtu.be/9IlDD186CrU?si=YeSm9Njiz-Cllu4j" },
    credits: { poet: "Матвей Горбанёв", music: "Дмитрий Дунаев", performers: ["Анастасия Францева", "Дмитрий Дунаев"] }
  },
  {
    slug: "vysoko",
    title: "Высоко",
    summary: "Соло",
    date: "",
    tags: ["song", "solo"],
    roles: ["Вокал"],
    cover: "/images/projects/vysoko.png",
    links: { youtube: "https://youtu.be/pGRB8PBGyXs?si=kLD9emIAemupQn9A" },
    credits: { performers: ["Анастасия Францева"] }
  },
  {
    slug: "veterany-putin-sila",
    title: "Ветераны (Путин сила)!",
    summary: "Патриотическая композиция",
    date: "",
    tags: ["song", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/veterany-putin-sila.png",
    links: { vk: "https://vk.com/audio474499246_456823283" },
    credits: { poet: "Матвей Горбанёв", music: "Дмитрий Дунаев", performers: ["Анастасия Францева", "Дмитрий Дунаев"] }
  },
  {
    slug: "donbasskiy-marsh",
    title: "Донбасский марш",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/donbasskiy-marsh.png",
    links: { youtube: "https://youtu.be/XMWdMR0p7nk?feature=shared" },
    credits: { poet: "Дмитрий Лик", music: "Дмитрий Дунаев", performers: ["Анастасия Францева", "Дмитрий Дунаев"] }
  },
  {
    slug: "skorbit-rossiya",
    title: "Скорбит Россия",
    summary: "Патриотическая композиция",
    date: "",
    tags: ["song", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/skorbit-rossiya.png",
    links: { youtube: "https://youtu.be/9io5ZuMOvcA?si=m7MgCqsnKg_oXDoG" },
    credits: { poet: "Дмитрий Лик", music: "Дмитрий Дунаев", performers: ["Анастасия Францева", "Дмитрий Дунаев"] }
  },
  {
    slug: "bez-provoda",
    title: "Без повода",
    summary: "Соло",
    date: "",
    tags: ["song", "solo"],
    roles: ["Вокал"],
    cover: "/images/projects/bez-povoda.png",
    links: { youtube: "https://youtu.be/uQ9Qwb4xha8?si=_IXSi4_sEgme-jJs" },
    credits: { performers: ["Анастасия Францева"] }
  },
  {
    slug: "ya-dozhdus-tebya-soldat",
    title: "Я дождусь тебя, солдат",
    summary: "Соло (mp3)",
    date: "",
    tags: ["song", "solo", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/ya-dozhdus-tebya-soldat.png",
    links: {
      mp3: "https://disk.yandex.ru/d/NDZIHCYOF31nAQ/08%20%D0%AF%20%D0%B4%D0%BE%D0%B6%D1%83%D0%B4%D1%83%D1%81%D1%8C%20%D1%82%D0%B5%D0%B1%D1%8F%2C%20%D1%81%D0%BE%D0%BB%D0%B4%D0%B0%D1%82%20%D0%90%D0%BD%D0%B0%D1%81%D1%82%D0%B0%D1%81%D0%B8%D1%8F%20%D0%A4%D1%80%D0%B0%D0%BD%D1%86%D0%B5%D0%B2%D0%B0.mp3"
    },
    credits: { poet: "Инна Клочкова", music: "Дмитрий Дунаев", performers: ["Анастасия Францева"] }
  },
  {
    slug: "avdeevka-nasha",
    title: "Авдеевка наша!",
    summary: "Совместная композиция",
    date: "",
    tags: ["song", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/avdeevka-nasha.png",
    links: { yandex: "" },
    credits: {
      poet: "Матвей Горбанёв",
      music: "Дмитрий Дунаев",
      performers: ["Анастасия Францева", "Дмитрий Дунаев", "Денис Колчин"]
    }
  },
  {
    slug: "Ahmat-Sila",
    title: "Ахмат-Сила",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/ahmatsila.png",
    credits: {
        poet: "Матвей Горбанёв",
        music: "Дмитрий Дунаев",
        performers: ["Анастасия Францева", "Дмитрий Дунаев"]
    }
   },
    {
    slug: "Specnaz-ahmat",
    title: "Спецназ Ахмат",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/specahmat.png",
    credits: {
        poet: "Дмитрий Лик",
        music: "Дмитрий Дунаев",
        performers: ["Анастасия Францева", "Дмитрий Дунаев"]
    }
  },
  {
    slug: "Frontovaya",
    title: "Фронтовая",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/frontovaya.png",
    credits: {
        poet: "Дмитрий Лик",
        music: "Дмитрий Дунаев",
        performers: ["Анастасия Францева", "Дмитрий Дунаев"]
    }
  },
  {
    slug: "Byt-geroem",
    title: "Быть героем",
    summary: "Дуэт",
    date: "",
    tags: ["song", "duet", "patriotic"],
    roles: ["Вокал"],
    cover: "/images/projects/bytgeroem.png",
    credits: {
        poet: "Дмитрий Лик",
        music: "Дмитрий Дунаев",
        performers: ["Анастасия Францева", "Дмитрий Дунаев"]
    }
  }
];
