const groups = [
    {
      name: "Légio de Marie",
      description:
        "Umuryango w'abakirisitu w'abalayiki ugizwe n'abanyamuryango bakorera Kiliziya binyuze mu masengesho n'imirimo y'ubwiza. Abanyamuryango batanga umusanzu mu buzima bwa paruwasi binyuze mu gusura imiryango, abarwayi, no gufatanya mu bikorwa byo kwamamaza ijambo ry'Imana.",
      meeting: "Tuesdays, 6:00 PM",
      leader: "Pascal Karangwa",
      phone: "+250788482825",
      image: "Légio.jpg",
    },
    {
      name: "Impuhwe z'Imana",
      description:
        "Intego y'umuryango w'Impuhwe z'Imana ni ugushyiraho ahantu h'urukundo, imbabazi, n'ubuntu hagati y'abanyamuryango. Ugamije gukora ahantu abantu bashobora gushyigikirana, gukira ibikomere byashize, no gukura hamwe mu kwizera. Mu gukorana impuhwe mu bikorwa bya buri munsi, umuryango ugaragaza urukundo rw'Imana, bigatuma habaho ubumwe, amahoro, no gukura mu kwemera kwa buri wese.",
      meeting: "First Thursday of each month, 7:30 PM",
      leader: "Consolata Mukandimanyi",
      phone: "+250788513472",
      image: "Miséricorde.jpg",
    },
    {
      name: "Aba Karisimatike",
      description:
        "Umuryango w’Abakirisitu ukora ibikorwa by’ivugurura ry’umwuka, gusenga, no guteza imbere umubano wimbitse n’Umwuka Wera. Abanyamuryango bitabira gusenga, gukira, no gukora ibikorwa by’ubuvugizi mu gutera imbaraga ukwemera kwabo no gusangiza urukundo rw’Imana.",
      meeting: "Second Wednesday of each month, 7:00 PM",
      leader: "Fulgence Nzabonimpa",
      phone: "+250783235877",
      image: "charismatic.png",
    },
    {
      name: "Mouvent Marial Sacérodotal",
      description:
        "Umuryango Gatolika ugamije gushyigikira abapadiri n’abakirisitu binyuze mu kwiyegurira Bikira Mariya. Abanyamuryango biyemeza gusenga, kongera imbaraga mu kwemera, no gushishikariza ubumwe mu Itorero. Bahamagarirwa gukurikira uburere bwa Mariya, kugira ukwemera gukomeye, kumvira Kiliziya no kwamamaza Inkuru Nziza.",
      meeting: "Mondays, 5:30 PM",
      leader: "Immaculée Mukamana",
      phone: "+250788754441",
      image: "MarianMovement.jpg",
    },
    {
      name: "Mouvement Xaveri",
      description:
        "Umuryango w’urubyiruko Gatolika wibanda ku burere bw’imyemerere, imibereho myiza, n’indangagaciro, wubakiye ku ndangagaciro za Mutagatifu Fransisiko Xavier. Abanyamuryango bagira uruhare mu buyobozi, ibikorwa by’ubwitange, no gukomeza ukwemera kwabo binyuze mu bikorwa by’iyogezabutumwa.",
      meeting: "Third Monday of each month, 7:00 PM",
      leader: "Habumuremyi Jean Jacques Hyacenthe",
      phone: "+250729495248",
      image: "Xaveri.jpeg",
    },
    {
      name: "Abanyamutima",
      description:
        "Umuryango w’Abakirisitu wiyeguriye Mutima Mutagatifu wa Yezu, ugamije gushimangira ukwemera binyuze mu isengesho, gusingiza Imana, no gukora ibikorwa by’urukundo. Abanyamuryango biyemeza kwigana umutima w’impuhwe wa Kristu, bakorera abandi, bashyira hamwe, kandi bakwirakwiza ukwizera Mutima Mutagatifu wa Yezu mu muryango wabo no muri paruwasi.",
      meeting: "Last Friday of each month, 6:30 PM",
      leader: "Richard Sebahire",
      phone: "+250788449815",
      image: "Abanyamutima.jpg",
    },
    {
      name: "Indabo za Maria",
      description:
        "Itsinda ry’abakristu basenga no gukorera Umubyeyi Bikiramariya, bakamwubaha binyuze mu isengesho, ibikorwa by’urukundo, n’ubwitange. Abanyamuryango bagamije kubaho bakurikije urugero rwa Bikira Mariya mu kwicisha bugufi, kumvira, no kugira impuhwe, bakagira uruhare mu buzima bw’itorero no mu iyogezabutumwa.",
      meeting: "Last Friday of each month, 6:30 PM",
      leader: "Rutembesa Epimaque",
      phone: "+250788594136",
      image: "bikira-maria.jpg",
    },
    {
      name: "Chemin Néo-Catéchuménat",
      description:
        "Umuryango w’Abakristu ugamije gukomeza ukwemera no kwigisha Ivanjili binyuze mu rugendo rw’ubwigishwa bw’imbitse. Abanyamuryango bakorera mu matsinda mato mu muryangoremezo, basoma Bibiliya, bahimbaza Ukaristiya, kandi bagaragaza ukwemera kwabo binyuze mu butumwa, kongera imbaraga mu miryango, no gukorera abandi.",
      meeting: "Last Friday of each month, 6:30 PM",
      leader: "Jean de Dieu Maniraguha",
      phone: "+250788513472",
      image: "Chemin-Neocatechumenal.jpg",
    },
  ];
  
  export function fetchGroups() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(groups);
      }, 1000); 
    });
  }