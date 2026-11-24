// Liceo Psicopedagógico Paola - Institutional Data

export interface Student {
  id: number;
  n: string;
  doc: string;
  age: number;
  sex: "Masculino" | "Femenino";
  gn: number;
  g: string;
  ac: number[];
  paid: boolean;
  debt: number;
  nfcCode: string;
}

export interface Guardian {
  id: number;
  n: string;
  doc: string;
  tel: string;
  mail: string;
  rel: string;
  kids: number[];
}

export interface Teacher {
  id: number;
  n: string;
  doc: string;
  tel: string;
  mail: string;
  asig: string;
  coord: string;
  short: string;
}

export interface AdminStaff {
  id: number;
  n: string;
  doc: string;
  tel: string;
  mail: string;
  ocup: string;
}

export type ScheduleSlot = [subject: string, teacherId: number];
export type DaySchedule = ScheduleSlot[];
export type GradeSchedule = [DaySchedule, DaySchedule, DaySchedule, DaySchedule, DaySchedule];

export const RAW_STUDENTS: any[] = [
  [
    "Alberto Jerónimo Osorio Trujillo",
    "RC 5235728542",
    6,
    "Masculino",
    1,
    "1° Primaria",
    [
      180
    ]
  ],
  [
    "Alejandro Cuesta Pineda",
    "TI 3028994626",
    7,
    "Masculino",
    1,
    "1° Primaria",
    [
      152
    ]
  ],
  [
    "Brayan Herrera Sandoval",
    "RC 3760168115",
    6,
    "Masculino",
    1,
    "1° Primaria",
    [
      146
    ]
  ],
  [
    "Camilo Mosquera Escobar",
    "TI 3941915648",
    7,
    "Masculino",
    1,
    "1° Primaria",
    [
      174,
      212
    ]
  ],
  [
    "Erika Luciana Tamayo Mendoza",
    "RC 6186619688",
    6,
    "Femenino",
    1,
    "1° Primaria",
    [
      122
    ]
  ],
  [
    "Gabriela Mariana Rodríguez Gaviria",
    "TI 3570103043",
    7,
    "Femenino",
    1,
    "1° Primaria",
    [
      81
    ]
  ],
  [
    "Gustavo Correa Moreno",
    "TI 5112177210",
    7,
    "Masculino",
    1,
    "1° Primaria",
    [
      13
    ]
  ],
  [
    "Gustavo Suárez García",
    "TI 2508043858",
    7,
    "Masculino",
    1,
    "1° Primaria",
    [
      100
    ]
  ],
  [
    "Hernán Sandoval Tamayo",
    "TI 6338440032",
    7,
    "Masculino",
    1,
    "1° Primaria",
    [
      144
    ]
  ],
  [
    "Joaquín Medina Gómez",
    "TI 9814608163",
    7,
    "Masculino",
    1,
    "1° Primaria",
    [
      108
    ]
  ],
  [
    "Karen Montoya Campos",
    "RC 7156341172",
    6,
    "Femenino",
    1,
    "1° Primaria",
    [
      160,
      71
    ]
  ],
  [
    "Mauricio Londoño Acosta",
    "TI 2134792585",
    7,
    "Masculino",
    1,
    "1° Primaria",
    [
      0
    ]
  ],
  [
    "Nubia Ríos Osorio",
    "TI 7326835025",
    7,
    "Femenino",
    1,
    "1° Primaria",
    [
      203,
      52
    ]
  ],
  [
    "Tatiana López Acosta",
    "TI 8997714562",
    7,
    "Femenino",
    1,
    "1° Primaria",
    [
      47
    ]
  ],
  [
    "Édgar Zapata Cárdenas",
    "TI 7560653695",
    7,
    "Masculino",
    1,
    "1° Primaria",
    [
      210
    ]
  ],
  [
    "Óscar Thiago Díaz Campos",
    "RC 1520799825",
    6,
    "Masculino",
    1,
    "1° Primaria",
    [
      87
    ]
  ],
  [
    "Andrea Vélez Cuesta",
    "TI 1755099620",
    7,
    "Femenino",
    2,
    "2° Primaria",
    [
      159,
      111
    ]
  ],
  [
    "Cristian Jairo Díaz Campos",
    "TI 4067426448",
    8,
    "Masculino",
    2,
    "2° Primaria",
    [
      87
    ]
  ],
  [
    "Cristian Zapata Salazar",
    "TI 2857657881",
    7,
    "Masculino",
    2,
    "2° Primaria",
    [
      3,
      209
    ]
  ],
  [
    "David Ríos Núñez",
    "TI 5635217125",
    7,
    "Masculino",
    2,
    "2° Primaria",
    [
      183
    ]
  ],
  [
    "David Vargas Gómez",
    "TI 7145231843",
    7,
    "Masculino",
    2,
    "2° Primaria",
    [
      200
    ]
  ],
  [
    "Emmanuel Cardona Ruiz",
    "TI 8909966657",
    8,
    "Masculino",
    2,
    "2° Primaria",
    [
      44
    ]
  ],
  [
    "Jimena Mendoza Quintero",
    "TI 4476539622",
    7,
    "Femenino",
    2,
    "2° Primaria",
    [
      15
    ]
  ],
  [
    "Karen Gutiérrez Montoya",
    "TI 9407663889",
    8,
    "Femenino",
    2,
    "2° Primaria",
    [
      117
    ]
  ],
  [
    "Luciana Mosquera Beltrán",
    "TI 2150994409",
    8,
    "Femenino",
    2,
    "2° Primaria",
    [
      40,
      185
    ]
  ],
  [
    "Mateo Felipe Pérez Ibarra",
    "TI 5493663362",
    7,
    "Masculino",
    2,
    "2° Primaria",
    [
      31
    ]
  ],
  [
    "Sandra Ortiz Lara",
    "TI 8635819237",
    7,
    "Femenino",
    2,
    "2° Primaria",
    [
      181
    ]
  ],
  [
    "Tatiana Liliana Castro Valencia",
    "TI 2295165561",
    8,
    "Femenino",
    2,
    "2° Primaria",
    [
      54
    ]
  ],
  [
    "Valentina Londoño Ibarra",
    "TI 7039811397",
    8,
    "Femenino",
    2,
    "2° Primaria",
    [
      113,
      64
    ]
  ],
  [
    "Viviana Yuliana Ortiz Osorio",
    "TI 5679032824",
    8,
    "Femenino",
    2,
    "2° Primaria",
    [
      135
    ]
  ],
  [
    "Wilson Herrera Herrera",
    "TI 4498415990",
    7,
    "Masculino",
    2,
    "2° Primaria",
    [
      161
    ]
  ],
  [
    "Yesenia Cortés Ramírez",
    "TI 9984120689",
    8,
    "Femenino",
    2,
    "2° Primaria",
    [
      192
    ]
  ],
  [
    "Brayan Rincón Henao",
    "TI 4185486691",
    8,
    "Masculino",
    3,
    "3° Primaria",
    [
      101,
      11
    ]
  ],
  [
    "Dylan Tamayo Escobar",
    "TI 8493605359",
    9,
    "Masculino",
    3,
    "3° Primaria",
    [
      49,
      98
    ]
  ],
  [
    "Emmanuel Castro Restrepo",
    "TI 2799261312",
    9,
    "Masculino",
    3,
    "3° Primaria",
    [
      158
    ]
  ],
  [
    "Felipe Patiño Correa",
    "TI 7490091177",
    9,
    "Masculino",
    3,
    "3° Primaria",
    [
      9,
      213
    ]
  ],
  [
    "Hugo Londoño Campos",
    "TI 2707864895",
    8,
    "Masculino",
    3,
    "3° Primaria",
    [
      187
    ]
  ],
  [
    "Isabella Valentina Jiménez Castro",
    "TI 7361131746",
    9,
    "Femenino",
    3,
    "3° Primaria",
    [
      136,
      63
    ]
  ],
  [
    "Jorge Carlos Suárez López",
    "TI 8748053544",
    8,
    "Masculino",
    3,
    "3° Primaria",
    [
      137,
      116
    ]
  ],
  [
    "Marcela Acosta Mosquera",
    "TI 5848404105",
    8,
    "Femenino",
    3,
    "3° Primaria",
    [
      82
    ]
  ],
  [
    "Mariana Suárez Cardona",
    "TI 6265079003",
    8,
    "Femenino",
    3,
    "3° Primaria",
    [
      1,
      59
    ]
  ],
  [
    "María Bonilla Beltrán",
    "TI 8240736771",
    9,
    "Femenino",
    3,
    "3° Primaria",
    [
      20,
      141
    ]
  ],
  [
    "Rocío Lina Rojas Mosquera",
    "TI 2160479231",
    8,
    "Femenino",
    3,
    "3° Primaria",
    [
      61
    ]
  ],
  [
    "Samantha María Parra Campos",
    "TI 4910049739",
    9,
    "Femenino",
    3,
    "3° Primaria",
    [
      163
    ]
  ],
  [
    "Thiago Díaz Franco",
    "TI 8562675921",
    9,
    "Masculino",
    3,
    "3° Primaria",
    [
      24
    ]
  ],
  [
    "Thiago Mejía Henao",
    "TI 8213548896",
    8,
    "Masculino",
    3,
    "3° Primaria",
    [
      164
    ]
  ],
  [
    "Valentina Cuesta Restrepo",
    "TI 9826839909",
    8,
    "Femenino",
    3,
    "3° Primaria",
    [
      79,
      89
    ]
  ],
  [
    "Viviana Mejía Navarro",
    "TI 4717860501",
    8,
    "Femenino",
    3,
    "3° Primaria",
    [
      169
    ]
  ],
  [
    "Alejandra Gómez Cuesta",
    "TI 5053573614",
    10,
    "Femenino",
    4,
    "4° Primaria",
    [
      133
    ]
  ],
  [
    "Cristian Zapata Sánchez",
    "TI 6065333239",
    10,
    "Masculino",
    4,
    "4° Primaria",
    [
      88,
      69
    ]
  ],
  [
    "Daniel Martínez Restrepo",
    "TI 3552786683",
    9,
    "Masculino",
    4,
    "4° Primaria",
    [
      167
    ]
  ],
  [
    "Daniel Ospina García",
    "TI 4796331425",
    9,
    "Masculino",
    4,
    "4° Primaria",
    [
      121,
      83
    ]
  ],
  [
    "Daniela Andrea Cárdenas Giraldo",
    "TI 5168365924",
    10,
    "Femenino",
    4,
    "4° Primaria",
    [
      118
    ]
  ],
  [
    "Diego Fernando Tamayo Mendoza",
    "TI 3116349043",
    10,
    "Masculino",
    4,
    "4° Primaria",
    [
      122
    ]
  ],
  [
    "Gustavo Beltrán Lozano",
    "TI 9665892086",
    10,
    "Masculino",
    4,
    "4° Primaria",
    [
      176
    ]
  ],
  [
    "Jairo Marín Martínez",
    "TI 7949811865",
    10,
    "Masculino",
    4,
    "4° Primaria",
    [
      206,
      103
    ]
  ],
  [
    "Jhon Sánchez Rodríguez",
    "TI 9774321927",
    10,
    "Masculino",
    4,
    "4° Primaria",
    [
      80,
      35
    ]
  ],
  [
    "Lina Medina Campos",
    "TI 9622642779",
    10,
    "Femenino",
    4,
    "4° Primaria",
    [
      42,
      74
    ]
  ],
  [
    "Lucía Yuliana Duque Parra",
    "TI 3401488689",
    9,
    "Femenino",
    4,
    "4° Primaria",
    [
      147
    ]
  ],
  [
    "Luisa Zapata Acosta",
    "TI 5385319966",
    10,
    "Femenino",
    4,
    "4° Primaria",
    [
      153
    ]
  ],
  [
    "Mateo Londoño Acosta",
    "TI 1218500322",
    9,
    "Masculino",
    4,
    "4° Primaria",
    [
      0
    ]
  ],
  [
    "Paula Antonella Campos Cárdenas",
    "TI 1298550278",
    10,
    "Femenino",
    4,
    "4° Primaria",
    [
      10
    ]
  ],
  [
    "Sandra Paula Mosquera Vélez",
    "TI 1562930887",
    9,
    "Femenino",
    4,
    "4° Primaria",
    [
      102,
      32
    ]
  ],
  [
    "Sara García Ortiz",
    "TI 5136842938",
    9,
    "Femenino",
    4,
    "4° Primaria",
    [
      190,
      58
    ]
  ],
  [
    "Brayan Gustavo Vélez Vélez",
    "TI 1122158811",
    10,
    "Masculino",
    5,
    "5° Primaria",
    [
      55
    ]
  ],
  [
    "Cristian Herrera Ortiz",
    "TI 3197781270",
    10,
    "Masculino",
    5,
    "5° Primaria",
    [
      143,
      156
    ]
  ],
  [
    "Esperanza Mendoza Mejía",
    "TI 5461572023",
    10,
    "Femenino",
    5,
    "5° Primaria",
    [
      110,
      199
    ]
  ],
  [
    "Esteban Harold Cortés Bonilla",
    "TI 2311732439",
    11,
    "Masculino",
    5,
    "5° Primaria",
    [
      165
    ]
  ],
  [
    "Fabián Daniel Valencia Rodríguez",
    "TI 2945521843",
    11,
    "Masculino",
    5,
    "5° Primaria",
    [
      26,
      75
    ]
  ],
  [
    "Iván Alberto Jiménez Tamayo",
    "TI 6607634172",
    11,
    "Masculino",
    5,
    "5° Primaria",
    [
      207,
      29
    ]
  ],
  [
    "Karen López Moreno",
    "TI 7345604273",
    10,
    "Femenino",
    5,
    "5° Primaria",
    [
      202,
      123
    ]
  ],
  [
    "Lucía Cárdenas Torres",
    "TI 1359155893",
    11,
    "Femenino",
    5,
    "5° Primaria",
    [
      18,
      129
    ]
  ],
  [
    "Luisa Mejía Osorio",
    "TI 3705264935",
    11,
    "Femenino",
    5,
    "5° Primaria",
    [
      149,
      198
    ]
  ],
  [
    "Marcela Rojas Marín",
    "TI 4665974710",
    10,
    "Femenino",
    5,
    "5° Primaria",
    [
      43
    ]
  ],
  [
    "Nicolás Cortés Ramírez",
    "TI 4857365145",
    10,
    "Masculino",
    5,
    "5° Primaria",
    [
      192
    ]
  ],
  [
    "Renata Londoño Restrepo",
    "TI 8347023191",
    11,
    "Femenino",
    5,
    "5° Primaria",
    [
      139,
      68
    ]
  ],
  [
    "Renata Vélez Díaz",
    "TI 6318435551",
    11,
    "Femenino",
    5,
    "5° Primaria",
    [
      214
    ]
  ],
  [
    "Sara Marín Correa",
    "TI 1021549893",
    11,
    "Femenino",
    5,
    "5° Primaria",
    [
      191
    ]
  ],
  [
    "Thiago Henao Navarro",
    "TI 5069781508",
    10,
    "Masculino",
    5,
    "5° Primaria",
    [
      173
    ]
  ],
  [
    "Óscar Tamayo López",
    "TI 1856522996",
    10,
    "Masculino",
    5,
    "5° Primaria",
    [
      30
    ]
  ],
  [
    "Antonella Ortiz Bonilla",
    "TI 5718371145",
    12,
    "Femenino",
    6,
    "6° Bachillerato",
    [
      4,
      201
    ]
  ],
  [
    "Antonia Sandoval Londoño",
    "TI 9880025073",
    11,
    "Femenino",
    6,
    "6° Bachillerato",
    [
      77,
      53
    ]
  ],
  [
    "Carlos Parra Gaviria",
    "TI 4360166375",
    12,
    "Masculino",
    6,
    "6° Bachillerato",
    [
      57,
      168
    ]
  ],
  [
    "Carlos Rincón Ospina",
    "TI 7145531089",
    11,
    "Masculino",
    6,
    "6° Bachillerato",
    [
      140
    ]
  ],
  [
    "Claudia Rocío Giraldo Díaz",
    "TI 7093165193",
    11,
    "Femenino",
    6,
    "6° Bachillerato",
    [
      145,
      171
    ]
  ],
  [
    "Esteban Ricardo Vélez Vélez",
    "TI 7224502137",
    11,
    "Masculino",
    6,
    "6° Bachillerato",
    [
      55
    ]
  ],
  [
    "Esteban Zapata Acosta",
    "TI 4102021985",
    12,
    "Masculino",
    6,
    "6° Bachillerato",
    [
      178,
      104
    ]
  ],
  [
    "Fernando Leonardo Beltrán Lozano",
    "TI 5324904026",
    12,
    "Masculino",
    6,
    "6° Bachillerato",
    [
      176
    ]
  ],
  [
    "Hernán Camilo Ortiz Lara",
    "TI 4025506497",
    11,
    "Masculino",
    6,
    "6° Bachillerato",
    [
      181
    ]
  ],
  [
    "Jimena Acosta Díaz",
    "TI 4925980263",
    12,
    "Femenino",
    6,
    "6° Bachillerato",
    [
      51
    ]
  ],
  [
    "Leonardo Rojas López",
    "TI 9771401034",
    11,
    "Masculino",
    6,
    "6° Bachillerato",
    [
      36,
      48
    ]
  ],
  [
    "Lucas Lozano Rodríguez",
    "TI 9196321929",
    12,
    "Masculino",
    6,
    "6° Bachillerato",
    [
      78
    ]
  ],
  [
    "Mauricio Vargas Gómez",
    "TI 3658582360",
    12,
    "Masculino",
    6,
    "6° Bachillerato",
    [
      200
    ]
  ],
  [
    "Mónica Gabriela Marín Martínez",
    "TI 3540806030",
    12,
    "Femenino",
    6,
    "6° Bachillerato",
    [
      206,
      103
    ]
  ],
  [
    "Rocío Tamayo Arango",
    "TI 6010773124",
    12,
    "Femenino",
    6,
    "6° Bachillerato",
    [
      197,
      162
    ]
  ],
  [
    "Yuliana Ruiz Bonilla",
    "TI 5287611629",
    11,
    "Femenino",
    6,
    "6° Bachillerato",
    [
      148
    ]
  ],
  [
    "Carolina Yesenia Osorio Núñez",
    "TI 8798760668",
    13,
    "Femenino",
    7,
    "7° Bachillerato",
    [
      196
    ]
  ],
  [
    "Fabián Germán Ruiz Marín",
    "TI 8151955849",
    13,
    "Masculino",
    7,
    "7° Bachillerato",
    [
      189,
      28
    ]
  ],
  [
    "Fabián Montoya Sandoval",
    "TI 4973165368",
    13,
    "Masculino",
    7,
    "7° Bachillerato",
    [
      16
    ]
  ],
  [
    "Felipe Fabián Ortiz Osorio",
    "TI 9224843483",
    13,
    "Masculino",
    7,
    "7° Bachillerato",
    [
      135
    ]
  ],
  [
    "Gloria Gómez Sánchez",
    "TI 6758734678",
    13,
    "Femenino",
    7,
    "7° Bachillerato",
    [
      184
    ]
  ],
  [
    "Harold Jairo López Patiño",
    "TI 4606655979",
    12,
    "Masculino",
    7,
    "7° Bachillerato",
    [
      120,
      86
    ]
  ],
  [
    "Iván Ruiz Ruiz",
    "TI 4755562633",
    12,
    "Masculino",
    7,
    "7° Bachillerato",
    [
      211
    ]
  ],
  [
    "Juliana Ruiz Beltrán",
    "TI 9526073995",
    12,
    "Femenino",
    7,
    "7° Bachillerato",
    [
      99
    ]
  ],
  [
    "Lina Bonilla López",
    "TI 9177938155",
    13,
    "Femenino",
    7,
    "7° Bachillerato",
    [
      106,
      154
    ]
  ],
  [
    "Lucas Gutiérrez Marín",
    "TI 2801746978",
    13,
    "Masculino",
    7,
    "7° Bachillerato",
    [
      119
    ]
  ],
  [
    "Luciana García Guerrero",
    "TI 3572929005",
    12,
    "Femenino",
    7,
    "7° Bachillerato",
    [
      56
    ]
  ],
  [
    "Luis Camilo Parra Lara",
    "TI 3110039066",
    12,
    "Masculino",
    7,
    "7° Bachillerato",
    [
      25,
      193
    ]
  ],
  [
    "Natalia Sandoval Restrepo",
    "TI 9546637870",
    12,
    "Femenino",
    7,
    "7° Bachillerato",
    [
      84
    ]
  ],
  [
    "Patricia Antonia Aguirre Suárez",
    "TI 5537760799",
    12,
    "Femenino",
    7,
    "7° Bachillerato",
    [
      186
    ]
  ],
  [
    "Renata Herrera Patiño",
    "TI 5152316752",
    12,
    "Femenino",
    7,
    "7° Bachillerato",
    [
      142,
      107
    ]
  ],
  [
    "Álvaro Mauricio Gaviria Henao",
    "TI 1817226837",
    13,
    "Masculino",
    7,
    "7° Bachillerato",
    [
      166
    ]
  ],
  [
    "Andrea Escobar Martínez",
    "TI 2140649415",
    14,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      14
    ]
  ],
  [
    "Catalina Mosquera Escobar",
    "TI 5708991138",
    14,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      17,
      194
    ]
  ],
  [
    "Claudia Guerrero Mejía",
    "TI 2143450173",
    13,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      6,
      151
    ]
  ],
  [
    "Daniel David Cuesta Osorio",
    "TI 6136562421",
    13,
    "Masculino",
    8,
    "8° Bachillerato",
    [
      39
    ]
  ],
  [
    "Daniela Lara Ibarra",
    "TI 5986632583",
    13,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      175
    ]
  ],
  [
    "Diana Karen Hernández Gaviria",
    "TI 9653644462",
    14,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      94
    ]
  ],
  [
    "Esperanza Mónica Cuesta Mendoza",
    "TI 7435329189",
    13,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      177
    ]
  ],
  [
    "Jairo Castro Restrepo",
    "TI 1391278587",
    13,
    "Masculino",
    8,
    "8° Bachillerato",
    [
      158
    ]
  ],
  [
    "Juan Navarro Cuesta",
    "TI 7793665062",
    14,
    "Masculino",
    8,
    "8° Bachillerato",
    [
      157,
      72
    ]
  ],
  [
    "Juliana Yesenia Aguirre López",
    "TI 3225687827",
    13,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      182,
      37
    ]
  ],
  [
    "Karen Mariana Vargas Cardona",
    "TI 7041751087",
    14,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      112
    ]
  ],
  [
    "Leonardo Alberto Marín Patiño",
    "TI 5213795841",
    13,
    "Masculino",
    8,
    "8° Bachillerato",
    [
      124,
      150
    ]
  ],
  [
    "Marcela Laura Trujillo Pineda",
    "TI 8391391779",
    13,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      128
    ]
  ],
  [
    "Santiago Tamayo Jiménez",
    "TI 4469641281",
    13,
    "Masculino",
    8,
    "8° Bachillerato",
    [
      33
    ]
  ],
  [
    "Tatiana Ríos Núñez",
    "TI 8789061900",
    14,
    "Femenino",
    8,
    "8° Bachillerato",
    [
      183
    ]
  ],
  [
    "Édgar Alejandro García Lara",
    "TI 1664683610",
    14,
    "Masculino",
    8,
    "8° Bachillerato",
    [
      188
    ]
  ],
  [
    "Alejandro Osorio Rincón",
    "TI 5200566117",
    14,
    "Masculino",
    9,
    "9° Bachillerato",
    [
      127
    ]
  ],
  [
    "Antonia Marín Ospina",
    "TI 9226329368",
    14,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      131,
      21
    ]
  ],
  [
    "Claudia Lina Ortiz Tamayo",
    "TI 4453509497",
    14,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      179,
      92
    ]
  ],
  [
    "Daniel Édgar Navarro Suárez",
    "TI 8503595967",
    15,
    "Masculino",
    9,
    "9° Bachillerato",
    [
      73
    ]
  ],
  [
    "Emilia Johana Gómez Salazar",
    "TI 8298091551",
    15,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      70
    ]
  ],
  [
    "Isabella Emilia Díaz Campos",
    "TI 5484710648",
    14,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      87
    ]
  ],
  [
    "Jerónimo Vargas Salazar",
    "TI 6059588323",
    15,
    "Masculino",
    9,
    "9° Bachillerato",
    [
      91
    ]
  ],
  [
    "Lina Lara Jiménez",
    "TI 5879235624",
    14,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      27,
      172
    ]
  ],
  [
    "Lina Sandoval García",
    "TI 5342141143",
    15,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      93
    ]
  ],
  [
    "Luisa Ruiz Marín",
    "TI 3685255839",
    14,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      189,
      28
    ]
  ],
  [
    "Manuela Laura Rincón Guerrero",
    "TI 5061981839",
    15,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      66
    ]
  ],
  [
    "María Herrera Ospina",
    "TI 7835462674",
    14,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      109,
      208
    ]
  ],
  [
    "Matías Mateo Lara Ibarra",
    "TI 7678001960",
    14,
    "Masculino",
    9,
    "9° Bachillerato",
    [
      175
    ]
  ],
  [
    "Sara Arango Gómez",
    "TI 5812420940",
    15,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      46,
      90
    ]
  ],
  [
    "Tatiana Pérez Mejía",
    "TI 5819559524",
    15,
    "Femenino",
    9,
    "9° Bachillerato",
    [
      50,
      195
    ]
  ],
  [
    "Álvaro Cárdenas Torres",
    "TI 1452034296",
    15,
    "Masculino",
    9,
    "9° Bachillerato",
    [
      18,
      129
    ]
  ],
  [
    "Andrés Camilo Arango Restrepo",
    "TI 2117333649",
    15,
    "Masculino",
    10,
    "10° Bachillerato",
    [
      19,
      115
    ]
  ],
  [
    "Camila Viviana Muñoz Beltrán",
    "TI 5556428645",
    16,
    "Femenino",
    10,
    "10° Bachillerato",
    [
      132
    ]
  ],
  [
    "Camilo Juan Vargas Correa",
    "TI 9731011756",
    16,
    "Masculino",
    10,
    "10° Bachillerato",
    [
      204
    ]
  ],
  [
    "Emilia Andrea Bonilla Duque",
    "TI 2376824172",
    15,
    "Femenino",
    10,
    "10° Bachillerato",
    [
      2
    ]
  ],
  [
    "Esteban Trujillo Mejía",
    "TI 2436196289",
    16,
    "Masculino",
    10,
    "10° Bachillerato",
    [
      126
    ]
  ],
  [
    "Julián Julián Osorio Trujillo",
    "TI 1468995662",
    16,
    "Masculino",
    10,
    "10° Bachillerato",
    [
      180
    ]
  ],
  [
    "Julián Kevin Zapata Londoño",
    "TI 8499724673",
    15,
    "Masculino",
    10,
    "10° Bachillerato",
    [
      5,
      34
    ]
  ],
  [
    "Leonardo Montoya Marín",
    "TI 5838132163",
    16,
    "Masculino",
    10,
    "10° Bachillerato",
    [
      38,
      7
    ]
  ],
  [
    "Martha Cortés Marín",
    "TI 1714919720",
    15,
    "Femenino",
    10,
    "10° Bachillerato",
    [
      134
    ]
  ],
  [
    "Rubén Díaz Martínez",
    "TI 3196268692",
    16,
    "Masculino",
    10,
    "10° Bachillerato",
    [
      205,
      8
    ]
  ],
  [
    "Santiago Ortiz Osorio",
    "TI 1179786105",
    16,
    "Masculino",
    10,
    "10° Bachillerato",
    [
      135
    ]
  ],
  [
    "Sebastián Herrera Herrera",
    "TI 7785940292",
    16,
    "Masculino",
    10,
    "10° Bachillerato",
    [
      161
    ]
  ],
  [
    "Valentina Osorio Castro",
    "TI 1402922632",
    15,
    "Femenino",
    10,
    "10° Bachillerato",
    [
      76,
      96
    ]
  ],
  [
    "Viviana Cárdenas Vélez",
    "TI 1282300218",
    16,
    "Femenino",
    10,
    "10° Bachillerato",
    [
      138
    ]
  ],
  [
    "Yesenia Herrera Pineda",
    "TI 1511868499",
    15,
    "Femenino",
    10,
    "10° Bachillerato",
    [
      170,
      85
    ]
  ],
  [
    "Ángela Mosquera Escobar",
    "TI 6778748319",
    15,
    "Femenino",
    10,
    "10° Bachillerato",
    [
      17,
      194
    ]
  ],
  [
    "Daniela Herrera Patiño",
    "TI 6689887079",
    16,
    "Femenino",
    11,
    "11° Bachillerato",
    [
      142,
      107
    ]
  ],
  [
    "Diana Marcela García Lara",
    "TI 5607241699",
    17,
    "Femenino",
    11,
    "11° Bachillerato",
    [
      188
    ]
  ],
  [
    "Emilia Parra Lara",
    "TI 4316992026",
    17,
    "Femenino",
    11,
    "11° Bachillerato",
    [
      25,
      193
    ]
  ],
  [
    "Germán Kevin Sandoval Lozano",
    "TI 5521750154",
    16,
    "Masculino",
    11,
    "11° Bachillerato",
    [
      97
    ]
  ],
  [
    "Hernán Hugo Mosquera Vélez",
    "TI 9895064023",
    17,
    "Masculino",
    11,
    "11° Bachillerato",
    [
      102,
      32
    ]
  ],
  [
    "Joaquín Rodríguez Campos",
    "TI 3038135521",
    16,
    "Masculino",
    11,
    "11° Bachillerato",
    [
      41,
      155
    ]
  ],
  [
    "Jorge Salazar Pineda",
    "TI 1532278316",
    17,
    "Masculino",
    11,
    "11° Bachillerato",
    [
      125,
      95
    ]
  ],
  [
    "Juliana Marín Martínez",
    "TI 1972510653",
    17,
    "Femenino",
    11,
    "11° Bachillerato",
    [
      206,
      103
    ]
  ],
  [
    "Julián Castro Ramírez",
    "TI 2576948595",
    16,
    "Masculino",
    11,
    "11° Bachillerato",
    [
      114,
      67
    ]
  ],
  [
    "Luisa Ortiz Vargas",
    "TI 1935110179",
    17,
    "Femenino",
    11,
    "11° Bachillerato",
    [
      62,
      65
    ]
  ],
  [
    "Martha Pérez Beltrán",
    "TI 1179483649",
    16,
    "Femenino",
    11,
    "11° Bachillerato",
    [
      45,
      22
    ]
  ],
  [
    "Mauricio Santiago Castro Moreno",
    "TI 8000298335",
    16,
    "Masculino",
    11,
    "11° Bachillerato",
    [
      105,
      12
    ]
  ],
  [
    "Rocío Herrera Correa",
    "TI 2661770367",
    16,
    "Femenino",
    11,
    "11° Bachillerato",
    [
      23
    ]
  ],
  [
    "Rubén Harold Castro Rojas",
    "TI 3342330029",
    17,
    "Masculino",
    11,
    "11° Bachillerato",
    [
      60
    ]
  ],
  [
    "Simón Rojas Medina",
    "TI 8985972083",
    16,
    "Masculino",
    11,
    "11° Bachillerato",
    [
      130
    ]
  ]
];
export const RAW_GUARDIANS: any[] = [
  [
    "Antonella Acosta García",
    "CC 4619799465",
    "321 587 2113",
    "antonella.acosta@example.com",
    "Madre",
    [
      11,
      60
    ]
  ],
  [
    "Adriana Cardona Suárez",
    "CC 94401974",
    "313 394 7016",
    "adriana.cardona@example.com",
    "Madre",
    [
      40
    ]
  ],
  [
    "Adriana Duque Guerrero",
    "CC 13890948",
    "329 415 2051",
    "adriana.duque@example.com",
    "Madre",
    [
      147
    ]
  ],
  [
    "Adriana Salomé Salazar Patiño",
    "CC 80086680",
    "321 955 3729",
    "adriana.salazar@example.com",
    "Madre",
    [
      18
    ]
  ],
  [
    "Alejandra Bonilla Sánchez",
    "CC 95472520",
    "303 692 8968",
    "alejandra.bonilla@example.com",
    "Madre",
    [
      80
    ]
  ],
  [
    "Alejandra Carolina Londoño Ramírez",
    "CC 2665403737",
    "325 654 4855",
    "alejandra.londono@example.com",
    "Madre",
    [
      150
    ]
  ],
  [
    "Alejandra Mejía Gómez",
    "CC 1105687564",
    "318 368 3088",
    "alejandra.mejia@example.com",
    "Madre",
    [
      114
    ]
  ],
  [
    "Alejandro Montoya Muñoz",
    "CC 49571718",
    "319 497 1446",
    "alejandro.montoya@example.com",
    "Padre",
    [
      151
    ]
  ],
  [
    "Alejandro Thiago Díaz Pineda",
    "CC 94581622",
    "319 381 7932",
    "alejandro.diaz@example.com",
    "Padre",
    [
      153
    ]
  ],
  [
    "Andrea Correa Cardona",
    "CC 9753631653",
    "311 864 9641",
    "andrea.correa@example.com",
    "Madre",
    [
      35
    ]
  ],
  [
    "Andrea Cárdenas Ospina",
    "CC 92046860",
    "311 593 5596",
    "andrea.cardenas@example.com",
    "Madre",
    [
      61
    ]
  ],
  [
    "Andrea Henao Cortés",
    "CC 63783200",
    "314 220 8613",
    "andrea.henao@example.com",
    "Abuela",
    [
      32
    ]
  ],
  [
    "Andrés Andrés Castro García",
    "CC 3941016556",
    "321 428 5904",
    "andres.castro@example.com",
    "Padre",
    [
      171
    ]
  ],
  [
    "Andrés Correa Franco",
    "CC 3825766758",
    "323 352 2220",
    "andres.correa@example.com",
    "Padre",
    [
      6
    ]
  ],
  [
    "Andrés Martínez Cortés",
    "CC 7978283145",
    "310 340 7348",
    "andres.martinez@example.com",
    "Abuelo",
    [
      112
    ]
  ],
  [
    "Antonella Quintero Rodríguez",
    "CC 9759919392",
    "312 632 3618",
    "antonella.quintero@example.com",
    "Tía",
    [
      22
    ]
  ],
  [
    "Antonella Sandoval Salazar",
    "CC 97632039",
    "320 105 3540",
    "antonella.sandoval@example.com",
    "Madre",
    [
      98
    ]
  ],
  [
    "Antonia Escobar Cárdenas",
    "CC 3951025467",
    "305 876 8619",
    "antonia.escobar@example.com",
    "Madre",
    [
      113,
      159
    ]
  ],
  [
    "Antonia Torres Restrepo",
    "CC 5519500373",
    "304 689 2834",
    "antonia.torres@example.com",
    "Madre",
    [
      71,
      143
    ]
  ],
  [
    "Beatriz Restrepo Aguirre",
    "CC 9633885546",
    "319 748 4834",
    "beatriz.restrepo@example.com",
    "Madre",
    [
      144
    ]
  ],
  [
    "Brayan Bonilla Navarro",
    "CC 1116562865",
    "311 367 3544",
    "brayan.bonilla@example.com",
    "Padre",
    [
      41
    ]
  ],
  [
    "Brayan Ospina Montoya",
    "CC 3680585496",
    "313 182 3773",
    "brayan.ospina@example.com",
    "Abuelo",
    [
      129
    ]
  ],
  [
    "Brayan Pérez Rincón",
    "CC 2678910690",
    "313 916 5097",
    "brayan.perez@example.com",
    "Padre",
    [
      170
    ]
  ],
  [
    "Camila Correa Ospina",
    "CC 7203885000",
    "323 497 5214",
    "camila.correa@example.com",
    "Tía",
    [
      172
    ]
  ],
  [
    "Camila Franco Escobar",
    "CC 88650386",
    "310 194 2396",
    "camila.franco@example.com",
    "Abuela",
    [
      44
    ]
  ],
  [
    "Camila Lara Franco",
    "CC 52337775",
    "304 509 9639",
    "camila.lara@example.com",
    "Madre",
    [
      107,
      162
    ]
  ],
  [
    "Camila Salomé Rodríguez Rodríguez",
    "CC 2447263514",
    "320 928 3574",
    "camila.rodriguez@example.com",
    "Madre",
    [
      68
    ]
  ],
  [
    "Camila Yesenia Jiménez Cuesta",
    "CC 28039860",
    "304 835 7272",
    "camila.jimenez@example.com",
    "Madre",
    [
      135
    ]
  ],
  [
    "Camilo Brayan Ruiz Parra",
    "CC 3679836856",
    "319 217 5952",
    "camilo.ruiz@example.com",
    "Padre",
    [
      97,
      137
    ]
  ],
  [
    "Camilo Jiménez Vélez",
    "CC 56742008",
    "325 600 1881",
    "camilo.jimenez@example.com",
    "Padre",
    [
      69
    ]
  ],
  [
    "Camilo Tamayo Vargas",
    "CC 8941306121",
    "320 333 1729",
    "camilo.tamayo@example.com",
    "Padre",
    [
      79
    ]
  ],
  [
    "Carlos Felipe Pérez Correa",
    "CC 6900965345",
    "326 433 2824",
    "carlos.perez@example.com",
    "Padre",
    [
      25
    ]
  ],
  [
    "Carlos Fernando Mosquera Giraldo",
    "CC 1579225719",
    "318 438 9917",
    "carlos.mosquera@example.com",
    "Padre",
    [
      62,
      164
    ]
  ],
  [
    "Carlos Tamayo Escobar",
    "CC 7429698614",
    "304 368 9293",
    "carlos.tamayo@example.com",
    "Padre",
    [
      125
    ]
  ],
  [
    "Carlos Zapata Sánchez",
    "CC 1320002748",
    "308 961 7519",
    "carlos.zapata@example.com",
    "Padre",
    [
      150
    ]
  ],
  [
    "Carolina Daniela Sánchez Ospina",
    "CC 77403022",
    "324 701 1877",
    "carolina.sanchez@example.com",
    "Abuela",
    [
      56
    ]
  ],
  [
    "Carolina López Mosquera",
    "CC 81479983",
    "308 202 1723",
    "carolina.lopez@example.com",
    "Madre",
    [
      90
    ]
  ],
  [
    "Carolina López Salazar",
    "CC 3971505160",
    "300 903 1699",
    "carolina.lopez2@example.com",
    "Abuela",
    [
      121
    ]
  ],
  [
    "Carolina Marín Díaz",
    "CC 2231562489",
    "303 995 2060",
    "carolina.marin@example.com",
    "Madre",
    [
      151
    ]
  ],
  [
    "Carolina Natalia Osorio Escobar",
    "CC 45229406",
    "304 133 5792",
    "carolina.osorio@example.com",
    "Madre",
    [
      115
    ]
  ],
  [
    "Catalina Beltrán Cárdenas",
    "CC 9054620312",
    "302 268 6612",
    "catalina.beltran@example.com",
    "Madre",
    [
      24
    ]
  ],
  [
    "Catalina Campos Arango",
    "CC 26385760",
    "305 690 2526",
    "catalina.campos@example.com",
    "Madre",
    [
      165
    ]
  ],
  [
    "Catalina Campos Osorio",
    "CC 13123030",
    "315 487 3390",
    "catalina.campos2@example.com",
    "Madre",
    [
      57
    ]
  ],
  [
    "Catalina Lucía Marín Navarro",
    "CC 67685361",
    "315 395 1632",
    "catalina.marin@example.com",
    "Madre",
    [
      73
    ]
  ],
  [
    "Catalina Ruiz Salazar",
    "CC 9707451420",
    "306 419 6081",
    "catalina.ruiz@example.com",
    "Madre",
    [
      21
    ]
  ],
  [
    "Claudia Beltrán Díaz",
    "CC 90542041",
    "305 387 7744",
    "claudia.beltran@example.com",
    "Madre",
    [
      170
    ]
  ],
  [
    "Claudia Gómez Restrepo",
    "CC 12460668",
    "309 140 4123",
    "claudia.gomez@example.com",
    "Madre",
    [
      141
    ]
  ],
  [
    "Cristian López López",
    "CC 69978789",
    "301 559 6614",
    "cristian.lopez@example.com",
    "Padre",
    [
      13
    ]
  ],
  [
    "Daniel Gutiérrez García",
    "CC 1881701286",
    "314 611 9181",
    "daniel.gutierrez@example.com",
    "Padrastro",
    [
      90
    ]
  ],
  [
    "Daniela Escobar Restrepo",
    "CC 1274956468",
    "314 737 5989",
    "daniela.escobar@example.com",
    "Madre",
    [
      33
    ]
  ],
  [
    "Daniela Manuela Mejía Correa",
    "CC 67517567",
    "324 459 5070",
    "daniela.mejia@example.com",
    "Madre",
    [
      142
    ]
  ],
  [
    "Daniela Mónica Díaz Navarro",
    "CC 9204104732",
    "303 277 8334",
    "daniela.diaz@example.com",
    "Madre",
    [
      89
    ]
  ],
  [
    "David Ríos Gómez",
    "CC 22698448",
    "303 259 6648",
    "david.rios@example.com",
    "Padre",
    [
      12
    ]
  ],
  [
    "David Sandoval Beltrán",
    "CC 5325778655",
    "326 153 6373",
    "david.sandoval@example.com",
    "Padre",
    [
      81
    ]
  ],
  [
    "Diana Adriana Valencia Tamayo",
    "CC 86064445",
    "318 370 1625",
    "diana.valencia@example.com",
    "Madre",
    [
      27
    ]
  ],
  [
    "Diana Vélez Martínez",
    "CC 14284423",
    "302 741 1818",
    "diana.velez@example.com",
    "Madre",
    [
      64,
      85
    ]
  ],
  [
    "Diego García Castro",
    "CC 7547868050",
    "304 572 5972",
    "diego.garcia@example.com",
    "Padre",
    [
      106
    ]
  ],
  [
    "Dylan Daniel Parra Moreno",
    "CC 5280614261",
    "315 915 6986",
    "dylan.parra@example.com",
    "Padre",
    [
      82
    ]
  ],
  [
    "Dylan García Lara",
    "CC 70330689",
    "323 592 6523",
    "dylan.garcia@example.com",
    "Padre",
    [
      63
    ]
  ],
  [
    "Dylan Suárez Ruiz",
    "CC 9472033454",
    "301 313 1859",
    "dylan.suarez@example.com",
    "Padre",
    [
      40
    ]
  ],
  [
    "Emilia Gabriela Rojas Londoño",
    "CC 3202388444",
    "326 378 2232",
    "emilia.rojas@example.com",
    "Madre",
    [
      173
    ]
  ],
  [
    "Emilia Sara Mosquera Hernández",
    "CC 46324810",
    "305 210 6560",
    "emilia.mosquera@example.com",
    "Madre",
    [
      42
    ]
  ],
  [
    "Emilia Vargas Marín",
    "CC 2950508022",
    "300 612 1131",
    "emilia.vargas@example.com",
    "Madre",
    [
      169
    ]
  ],
  [
    "Emmanuel Jiménez Díaz",
    "CC 2150830026",
    "301 126 1209",
    "emmanuel.jimenez@example.com",
    "Padre",
    [
      37
    ]
  ],
  [
    "Emmanuel Londoño Correa",
    "CC 1687605438",
    "300 165 4549",
    "emmanuel.londono@example.com",
    "Padre",
    [
      28
    ]
  ],
  [
    "Erika Andrea Ortiz Ibarra",
    "CC 1971722991",
    "314 435 3603",
    "erika.ortiz@example.com",
    "Abuela",
    [
      169
    ]
  ],
  [
    "Esperanza Guerrero Ríos",
    "CC 8810807799",
    "316 143 4400",
    "esperanza.guerrero@example.com",
    "Tía",
    [
      138
    ]
  ],
  [
    "Fabián Castro Trujillo",
    "CC 3720154575",
    "321 310 3448",
    "fabian.castro@example.com",
    "Padre",
    [
      168
    ]
  ],
  [
    "Fabián Gaviria Lara",
    "CC 59905295",
    "325 697 9406",
    "fabian.gaviria@example.com",
    "Padrastro",
    [
      75
    ]
  ],
  [
    "Fabián Sandoval Aguirre",
    "CC 8241499061",
    "308 683 6083",
    "fabian.sandoval@example.com",
    "Padrastro",
    [
      49
    ]
  ],
  [
    "Fernando Iván Gómez Trujillo",
    "CC 5197471156",
    "322 124 5883",
    "fernando.gomez@example.com",
    "Padre",
    [
      132
    ]
  ],
  [
    "Fernando Montoya Sandoval",
    "CC 9069943973",
    "301 377 6269",
    "fernando.montoya@example.com",
    "Padre",
    [
      10
    ]
  ],
  [
    "Gabriel Navarro Valencia",
    "CC 91702350",
    "310 876 4174",
    "gabriel.navarro@example.com",
    "Padre",
    [
      120
    ]
  ],
  [
    "Gabriela Luciana Suárez Londoño",
    "CC 6881008125",
    "323 295 7000",
    "gabriela.suarez@example.com",
    "Madre",
    [
      131
    ]
  ],
  [
    "Germán Medina Sánchez",
    "CC 1412035506",
    "313 144 9170",
    "german.medina@example.com",
    "Padre",
    [
      57
    ]
  ],
  [
    "Germán Valencia Patiño",
    "CC 7383696366",
    "324 685 7596",
    "german.valencia@example.com",
    "Padre",
    [
      68
    ]
  ],
  [
    "Gloria Castro Lozano",
    "CC 44371735",
    "315 387 6298",
    "gloria.castro@example.com",
    "Madre",
    [
      156
    ]
  ],
  [
    "Gloria Londoño Valencia",
    "CC 84589166",
    "323 558 6969",
    "gloria.londono@example.com",
    "Madre",
    [
      81
    ]
  ],
  [
    "Gloria Lozano Ríos",
    "CC 82923434",
    "301 918 7109",
    "gloria.lozano@example.com",
    "Abuela",
    [
      91
    ]
  ],
  [
    "Gloria Restrepo Ibarra",
    "CC 85588247",
    "325 298 1864",
    "gloria.restrepo@example.com",
    "Madre",
    [
      46
    ]
  ],
  [
    "Gloria Rodríguez Muñoz",
    "CC 37718669",
    "317 407 9216",
    "gloria.rodriguez@example.com",
    "Madre",
    [
      56
    ]
  ],
  [
    "Gloria Valentina Gaviria Rincón",
    "CC 6224685794",
    "310 520 5696",
    "gloria.gaviria@example.com",
    "Abuela",
    [
      5
    ]
  ],
  [
    "Gustavo Acosta Díaz",
    "CC 5416436472",
    "317 554 7322",
    "gustavo.acosta@example.com",
    "Padre",
    [
      39
    ]
  ],
  [
    "Harold Ospina Cardona",
    "CC 97474675",
    "319 718 6425",
    "harold.ospina@example.com",
    "Padre",
    [
      51
    ]
  ],
  [
    "Hernán Camilo Sandoval Vargas",
    "CC 80446581",
    "323 938 3582",
    "hernan.sandoval@example.com",
    "Padre",
    [
      108
    ]
  ],
  [
    "Hernán Juan Herrera Cortés",
    "CC 7642847014",
    "308 186 1205",
    "hernan.herrera@example.com",
    "Padre",
    [
      158
    ]
  ],
  [
    "Hugo López Gaviria",
    "CC 2740738189",
    "322 272 6498",
    "hugo.lopez@example.com",
    "Padre",
    [
      101
    ]
  ],
  [
    "Isabella Campos Salazar",
    "CC 9444221539",
    "328 246 9912",
    "isabella.campos@example.com",
    "Madre",
    [
      15,
      17,
      133
    ]
  ],
  [
    "Isabella Paula Sánchez Mendoza",
    "CC 3376187546",
    "305 321 5124",
    "isabella.sanchez@example.com",
    "Madre",
    [
      49
    ]
  ],
  [
    "Jairo Cuesta Núñez",
    "CC 29243493",
    "301 520 9351",
    "jairo.cuesta@example.com",
    "Padre",
    [
      46
    ]
  ],
  [
    "Jhon Arango Lozano",
    "CC 8219164538",
    "320 898 9942",
    "jhon.arango@example.com",
    "Padre",
    [
      141
    ]
  ],
  [
    "Jhon Salazar Tamayo",
    "CC 20854287",
    "327 785 9070",
    "jhon.salazar@example.com",
    "Tío",
    [
      134
    ]
  ],
  [
    "Jhon Tamayo Gómez",
    "CC 67003040",
    "315 432 4823",
    "jhon.tamayo@example.com",
    "Tío",
    [
      130
    ]
  ],
  [
    "Jimena García Mendoza",
    "CC 8271313325",
    "315 103 6152",
    "jimena.garcia@example.com",
    "Madre",
    [
      136
    ]
  ],
  [
    "Jimena Gaviria Díaz",
    "CC 9552412619",
    "306 478 5548",
    "jimena.gaviria@example.com",
    "Madre",
    [
      117
    ]
  ],
  [
    "Joaquín Marín Jiménez",
    "CC 26143246",
    "326 131 3762",
    "joaquin.marin@example.com",
    "Padrastro",
    [
      166
    ]
  ],
  [
    "Joaquín Osorio Navarro",
    "CC 95664541",
    "328 497 2636",
    "joaquin.osorio@example.com",
    "Padre",
    [
      156
    ]
  ],
  [
    "Joaquín Sandoval Mosquera",
    "CC 9814127876",
    "323 402 3152",
    "joaquin.sandoval@example.com",
    "Padre",
    [
      163
    ]
  ],
  [
    "Joaquín Tamayo Gaviria",
    "CC 3314539769",
    "317 311 4617",
    "joaquin.tamayo@example.com",
    "Padre",
    [
      33
    ]
  ],
  [
    "Johana Beltrán García",
    "CC 6415492128",
    "305 465 3380",
    "johana.beltran@example.com",
    "Madre",
    [
      103
    ]
  ],
  [
    "Johana García Muñoz",
    "CC 1865401261",
    "306 327 2150",
    "johana.garcia@example.com",
    "Madre",
    [
      7
    ]
  ],
  [
    "Johana Henao Quintero",
    "CC 1328497183",
    "304 676 5065",
    "johana.henao@example.com",
    "Madre",
    [
      32
    ]
  ],
  [
    "Johana Vélez Vargas",
    "CC 69038715",
    "326 688 7426",
    "johana.velez@example.com",
    "Madre",
    [
      62,
      164
    ]
  ],
  [
    "Juan Emmanuel Marín Lozano",
    "CC 9327028986",
    "311 475 2670",
    "juan.marin@example.com",
    "Padre",
    [
      55,
      93,
      167
    ]
  ],
  [
    "Juan Zapata Ospina",
    "CC 86339224",
    "303 172 9190",
    "juan.zapata@example.com",
    "Padre",
    [
      86
    ]
  ],
  [
    "Juliana Moreno Escobar",
    "CC 40660943",
    "316 274 1203",
    "juliana.moreno@example.com",
    "Madre",
    [
      171
    ]
  ],
  [
    "Juliana Valentina López Cárdenas",
    "CC 77977817",
    "312 391 8839",
    "juliana.lopez@example.com",
    "Madre",
    [
      104
    ]
  ],
  [
    "Julián Jerónimo Herrera Henao",
    "CC 73422941",
    "300 908 4994",
    "julian.herrera@example.com",
    "Padre",
    [
      110,
      160
    ]
  ],
  [
    "Julián Medina Trujillo",
    "CC 23133638",
    "322 649 6382",
    "julian.medina@example.com",
    "Padre",
    [
      9
    ]
  ],
  [
    "Karen Jimena Ospina García",
    "CC 67337768",
    "301 399 7140",
    "karen.ospina@example.com",
    "Madre",
    [
      139
    ]
  ],
  [
    "Karen Mejía Guerrero",
    "CC 1512686886",
    "323 610 9427",
    "karen.mejia@example.com",
    "Madre",
    [
      66
    ]
  ],
  [
    "Kevin Cuesta Castro",
    "CC 8040172695",
    "312 246 2878",
    "kevin.cuesta@example.com",
    "Abuelo",
    [
      16
    ]
  ],
  [
    "Laura Cardona Tamayo",
    "CC 96375513",
    "314 176 9513",
    "laura.cardona@example.com",
    "Madre",
    [
      122
    ]
  ],
  [
    "Laura Ibarra Mejía",
    "CC 39803834",
    "304 701 6022",
    "laura.ibarra@example.com",
    "Madre",
    [
      28
    ]
  ],
  [
    "Laura Rocío Ramírez Cuesta",
    "CC 69198200",
    "315 468 9160",
    "laura.ramirez@example.com",
    "Madre",
    [
      168
    ]
  ],
  [
    "Leonardo Daniel Arango Bonilla",
    "CC 1205468262",
    "315 556 7832",
    "leonardo.arango@example.com",
    "Padre",
    [
      144
    ]
  ],
  [
    "Leonardo Dylan Suárez Ortiz",
    "CC 6965739871",
    "326 144 3959",
    "leonardo.suarez@example.com",
    "Padre",
    [
      38
    ]
  ],
  [
    "Liliana Andrea Montoya Pérez",
    "CC 6947853315",
    "319 563 9376",
    "liliana.montoya@example.com",
    "Madre",
    [
      23
    ]
  ],
  [
    "Liliana Giraldo Guerrero",
    "CC 43905312",
    "322 725 3584",
    "liliana.giraldo@example.com",
    "Madre",
    [
      52
    ]
  ],
  [
    "Liliana Gutiérrez Restrepo",
    "CC 6101473371",
    "323 532 7376",
    "liliana.gutierrez@example.com",
    "Abuela",
    [
      105
    ]
  ],
  [
    "Liliana Patiño Montoya",
    "CC 4323817989",
    "301 146 5750",
    "liliana.patino@example.com",
    "Madre",
    [
      101
    ]
  ],
  [
    "Lina García Vélez",
    "CC 99824730",
    "314 685 1639",
    "lina.garcia@example.com",
    "Madre",
    [
      51
    ]
  ],
  [
    "Lina Mendoza Aguirre",
    "CC 12639391",
    "328 327 1835",
    "lina.mendoza@example.com",
    "Abuela",
    [
      4,
      53
    ]
  ],
  [
    "Lucas López López",
    "CC 5984502107",
    "310 410 4536",
    "lucas.lopez@example.com",
    "Padre",
    [
      70
    ]
  ],
  [
    "Lucas Marín Gaviria",
    "CC 8076375765",
    "315 521 8027",
    "lucas.marin@example.com",
    "Padre",
    [
      123
    ]
  ],
  [
    "Luciana Pineda Díaz",
    "CC 76545914",
    "306 868 2555",
    "luciana.pineda@example.com",
    "Madre",
    [
      166
    ]
  ],
  [
    "Lucía Mejía Campos",
    "CC 1683760823",
    "309 493 2232",
    "lucia.mejia@example.com",
    "Madre",
    [
      148
    ]
  ],
  [
    "Lucía Sara Rincón Arango",
    "CC 45890649",
    "306 834 6619",
    "lucia.rincon@example.com",
    "Madre",
    [
      128
    ]
  ],
  [
    "Luis Iván Trujillo Moreno",
    "CC 7273393673",
    "305 824 3368",
    "luis.trujillo@example.com",
    "Padre",
    [
      124
    ]
  ],
  [
    "Luis Nicolás Cárdenas Campos",
    "CC 99535411",
    "318 824 5708",
    "luis.cardenas@example.com",
    "Padre",
    [
      71,
      143
    ]
  ],
  [
    "Luis Rojas Sánchez",
    "CC 80577718",
    "312 195 9200",
    "luis.rojas@example.com",
    "Padre",
    [
      174
    ]
  ],
  [
    "Luisa Antonella Ospina Gómez",
    "CC 91973467",
    "300 391 1307",
    "luisa.ospina@example.com",
    "Abuela",
    [
      129
    ]
  ],
  [
    "Luisa Beltrán Duque",
    "CC 4614265969",
    "311 352 6057",
    "luisa.beltran@example.com",
    "Madre",
    [
      145
    ]
  ],
  [
    "Luisa Cuesta Giraldo",
    "CC 8675977515",
    "304 706 2079",
    "luisa.cuesta@example.com",
    "Madre",
    [
      48
    ]
  ],
  [
    "Luisa Martha Marín Ruiz",
    "CC 3338577319",
    "318 202 8134",
    "luisa.marin@example.com",
    "Madre",
    [
      152
    ]
  ],
  [
    "Luisa Sara Osorio Arango",
    "CC 4384477593",
    "321 763 9837",
    "luisa.osorio@example.com",
    "Madre",
    [
      29,
      99,
      154
    ]
  ],
  [
    "Manuela Castro Cuesta",
    "CC 7143095803",
    "306 962 9652",
    "manuela.castro@example.com",
    "Madre",
    [
      37
    ]
  ],
  [
    "Manuela López Mosquera",
    "CC 4966712078",
    "327 824 8077",
    "manuela.lopez@example.com",
    "Madre",
    [
      38
    ]
  ],
  [
    "Manuela Vélez Londoño",
    "CC 34014642",
    "306 761 8285",
    "manuela.velez@example.com",
    "Madre",
    [
      157
    ]
  ],
  [
    "Manuela Yuliana Restrepo Henao",
    "CC 95052563",
    "312 363 2936",
    "manuela.restrepo@example.com",
    "Madre",
    [
      75
    ]
  ],
  [
    "Marcela Ospina Correa",
    "CC 43829309",
    "312 202 7942",
    "marcela.ospina@example.com",
    "Madre",
    [
      83
    ]
  ],
  [
    "Marcela Tatiana Ospina Ríos",
    "CC 21882204",
    "310 432 9008",
    "marcela.ospina2@example.com",
    "Madrastra",
    [
      41
    ]
  ],
  [
    "Mariana Isabella Patiño Cardona",
    "CC 3618529630",
    "312 225 5552",
    "mariana.patino@example.com",
    "Madre",
    [
      110,
      160
    ]
  ],
  [
    "Mariana Ortiz Valencia",
    "CC 8821867570",
    "326 877 2813",
    "mariana.ortiz@example.com",
    "Madre",
    [
      65
    ]
  ],
  [
    "Mariana Sandoval Torres",
    "CC 6748666574",
    "315 776 3525",
    "mariana.sandoval@example.com",
    "Abuela",
    [
      8
    ]
  ],
  [
    "Martha Díaz Correa",
    "CC 27279348",
    "301 242 1968",
    "martha.diaz@example.com",
    "Madre",
    [
      84
    ]
  ],
  [
    "Martha Luciana Sandoval Pérez",
    "CC 8588973058",
    "310 420 9700",
    "martha.sandoval@example.com",
    "Madre",
    [
      2
    ]
  ],
  [
    "Martha Parra Duque",
    "CC 67292337",
    "319 772 8920",
    "martha.parra@example.com",
    "Madre",
    [
      58
    ]
  ],
  [
    "María Bonilla Duque",
    "CC 92094348",
    "309 818 9353",
    "maria.bonilla@example.com",
    "Madre",
    [
      95
    ]
  ],
  [
    "María Mejía Moreno",
    "CC 3961254265",
    "321 113 2577",
    "maria.mejia@example.com",
    "Abuela",
    [
      72
    ]
  ],
  [
    "María Núñez Mejía",
    "CC 3273023927",
    "310 653 9949",
    "maria.nunez@example.com",
    "Madrastra",
    [
      123
    ]
  ],
  [
    "Mateo Guerrero Mejía",
    "CC 3249395331",
    "323 446 1525",
    "mateo.guerrero@example.com",
    "Padre",
    [
      114
    ]
  ],
  [
    "Mateo Thiago Cuesta García",
    "CC 73192071",
    "308 763 1444",
    "mateo.cuesta@example.com",
    "Padre",
    [
      1
    ]
  ],
  [
    "Mateo Zapata Gaviria",
    "CC 6592154245",
    "321 130 2820",
    "mateo.zapata@example.com",
    "Padre",
    [
      59
    ]
  ],
  [
    "Mauricio Bonilla Zapata",
    "CC 15000771",
    "309 602 8435",
    "mauricio.bonilla@example.com",
    "Padre",
    [
      104
    ]
  ],
  [
    "Mauricio Rodríguez Arango",
    "CC 7333238501",
    "305 649 7262",
    "mauricio.rodriguez@example.com",
    "Padre",
    [
      165
    ]
  ],
  [
    "Mauricio Wilson Herrera Vélez",
    "CC 3130136900",
    "326 509 5850",
    "mauricio.herrera@example.com",
    "Padre",
    [
      65
    ]
  ],
  [
    "Michelle Cuesta Medina",
    "CC 6512097261",
    "315 181 6235",
    "michelle.cuesta@example.com",
    "Madre",
    [
      120
    ]
  ],
  [
    "Michelle Martha Restrepo Lozano",
    "CC 7403279208",
    "309 377 5506",
    "michelle.restrepo@example.com",
    "Madre",
    [
      34,
      119
    ]
  ],
  [
    "Michelle Vélez Suárez",
    "CC 9744905697",
    "301 778 6139",
    "michelle.velez@example.com",
    "Abuela",
    [
      16
    ]
  ],
  [
    "Mónica Campos Ríos",
    "CC 2660088094",
    "309 495 5417",
    "monica.campos@example.com",
    "Madre",
    [
      10
    ]
  ],
  [
    "Mónica Yesenia Herrera Navarro",
    "CC 83293260",
    "327 679 8669",
    "monica.herrera@example.com",
    "Madre",
    [
      30,
      155
    ]
  ],
  [
    "Nicolás Tamayo Herrera",
    "CC 88153201",
    "317 977 6722",
    "nicolas.tamayo@example.com",
    "Padre",
    [
      94
    ]
  ],
  [
    "Nubia Campos Lozano",
    "CC 35225542",
    "314 631 8460",
    "nubia.campos@example.com",
    "Madre",
    [
      43
    ]
  ],
  [
    "Nubia Henao Restrepo",
    "CC 98783047",
    "305 344 4025",
    "nubia.henao@example.com",
    "Madre",
    [
      45
    ]
  ],
  [
    "Paula Bonilla Ruiz",
    "CC 55685473",
    "322 186 2598",
    "paula.bonilla@example.com",
    "Madre",
    [
      67
    ]
  ],
  [
    "Renata Marcela Henao Pérez",
    "CC 9414967389",
    "309 531 7835",
    "renata.henao@example.com",
    "Madre",
    [
      111
    ]
  ],
  [
    "Ricardo Martínez Marín",
    "CC 1150780359",
    "317 287 2733",
    "ricardo.martinez@example.com",
    "Padre",
    [
      50
    ]
  ],
  [
    "Rocío Isabella García Salazar",
    "CC 5004867376",
    "314 688 4589",
    "rocio.garcia@example.com",
    "Madrastra",
    [
      82
    ]
  ],
  [
    "Rocío Navarro Rodríguez",
    "CC 50963119",
    "321 223 9292",
    "rocio.navarro@example.com",
    "Madre",
    [
      47
    ]
  ],
  [
    "Rocío Pineda Lara",
    "CC 71843435",
    "310 528 9832",
    "rocio.pineda@example.com",
    "Madre",
    [
      158
    ]
  ],
  [
    "Rubén Giraldo Franco",
    "CC 5072537707",
    "327 313 7856",
    "ruben.giraldo@example.com",
    "Padre",
    [
      84
    ]
  ],
  [
    "Rubén Lara Ospina",
    "CC 1889559814",
    "328 870 9847",
    "ruben.lara@example.com",
    "Padre",
    [
      135
    ]
  ],
  [
    "Salomé Johana Navarro Mendoza",
    "CC 22059667",
    "313 813 6202",
    "salome.navarro@example.com",
    "Madre",
    [
      78
    ]
  ],
  [
    "Samantha Escobar Sandoval",
    "CC 9784037751",
    "315 634 6796",
    "samantha.escobar@example.com",
    "Tía",
    [
      3
    ]
  ],
  [
    "Samantha Ibarra Campos",
    "CC 6134512932",
    "319 239 7962",
    "samantha.ibarra@example.com",
    "Madre",
    [
      116,
      140
    ]
  ],
  [
    "Samantha Lozano Lozano",
    "CC 53298597",
    "322 855 3863",
    "samantha.lozano@example.com",
    "Madre",
    [
      54,
      87
    ]
  ],
  [
    "Samantha Samantha Mendoza Giraldo",
    "CC 29953626",
    "300 217 5939",
    "samantha.mendoza@example.com",
    "Madre",
    [
      118
    ]
  ],
  [
    "Samantha Sandra Acosta García",
    "CC 6648784645",
    "308 189 6540",
    "samantha.acosta@example.com",
    "Madre",
    [
      86
    ]
  ],
  [
    "Samantha Tamayo García",
    "CC 79717582",
    "324 313 1007",
    "samantha.tamayo@example.com",
    "Tía",
    [
      130
    ]
  ],
  [
    "Samantha Trujillo Zapata",
    "CC 4171150508",
    "306 874 8864",
    "samantha.trujillo@example.com",
    "Madre",
    [
      0,
      149
    ]
  ],
  [
    "Samuel Alberto Ortiz Tamayo",
    "CC 3816700398",
    "323 298 7625",
    "samuel.ortiz@example.com",
    "Padre",
    [
      26,
      88
    ]
  ],
  [
    "Sandra López Pérez",
    "CC 49344612",
    "307 575 9197",
    "sandra.lopez@example.com",
    "Madre",
    [
      121
    ]
  ],
  [
    "Sandra Núñez Ríos",
    "CC 6881458101",
    "318 693 3546",
    "sandra.nunez@example.com",
    "Madre",
    [
      19,
      126
    ]
  ],
  [
    "Sandra Sánchez Cárdenas",
    "CC 77449928",
    "317 215 7817",
    "sandra.sanchez@example.com",
    "Abuela",
    [
      100
    ]
  ],
  [
    "Santiago Mosquera Cortés",
    "CC 53939894",
    "313 393 4402",
    "santiago.mosquera@example.com",
    "Padre",
    [
      24
    ]
  ],
  [
    "Sara Martha Suárez Cárdenas",
    "CC 8155465692",
    "317 232 9315",
    "sara.suarez@example.com",
    "Madre",
    [
      109
    ]
  ],
  [
    "Sebastián Campos Tamayo",
    "CC 36745442",
    "300 173 2411",
    "sebastian.campos@example.com",
    "Abuelo",
    [
      36
    ]
  ],
  [
    "Sofía Lara Gaviria",
    "CC 89315290",
    "322 498 3954",
    "sofia.lara@example.com",
    "Madre",
    [
      127,
      161
    ]
  ],
  [
    "Sofía Luciana Marín Sandoval",
    "CC 55841130",
    "308 649 3208",
    "sofia.marin@example.com",
    "Madre",
    [
      97,
      137
    ]
  ],
  [
    "Sofía Ortiz Salazar",
    "CC 9193107948",
    "305 213 1760",
    "sofia.ortiz@example.com",
    "Madre",
    [
      63
    ]
  ],
  [
    "Tatiana Correa Cortés",
    "CC 9102823070",
    "314 387 4210",
    "tatiana.correa@example.com",
    "Madre",
    [
      77
    ]
  ],
  [
    "Tatiana Cortés Navarro",
    "CC 6569939125",
    "315 297 4077",
    "tatiana.cortes@example.com",
    "Abuela",
    [
      31,
      74
    ]
  ],
  [
    "Thiago Tomás Parra Giraldo",
    "CC 8516289392",
    "311 472 3078",
    "thiago.parra@example.com",
    "Padre",
    [
      107,
      162
    ]
  ],
  [
    "Thiago Édgar Mosquera García",
    "CC 38534805",
    "319 612 4733",
    "thiago.mosquera@example.com",
    "Padre",
    [
      113,
      159
    ]
  ],
  [
    "Tomás Pérez Ramírez",
    "CC 3376381237",
    "313 293 8266",
    "tomas.perez@example.com",
    "Padre",
    [
      142
    ]
  ],
  [
    "Valentina Núñez García",
    "CC 5588208959",
    "315 436 8364",
    "valentina.nunez@example.com",
    "Madre",
    [
      96
    ]
  ],
  [
    "Viviana Gloria Arango Quintero",
    "CC 28865544",
    "300 729 6580",
    "viviana.arango@example.com",
    "Madre",
    [
      94
    ]
  ],
  [
    "Wilson Alberto Mejía Patiño",
    "CC 5860150807",
    "329 390 1921",
    "wilson.mejia@example.com",
    "Abuelo",
    [
      72
    ]
  ],
  [
    "Wilson Fernando Mendoza Escobar",
    "CC 3074378720",
    "313 241 4670",
    "wilson.mendoza@example.com",
    "Padre",
    [
      66
    ]
  ],
  [
    "Ximena Gómez Moreno",
    "CC 3771132083",
    "328 845 9110",
    "ximena.gomez@example.com",
    "Tía",
    [
      20,
      92
    ]
  ],
  [
    "Ximena Lucía Ortiz Henao",
    "CC 11774856",
    "311 841 8452",
    "ximena.ortiz@example.com",
    "Abuela",
    [
      80
    ]
  ],
  [
    "Ximena Moreno Mendoza",
    "CC 28273739",
    "304 556 2868",
    "ximena.moreno@example.com",
    "Madre",
    [
      70
    ]
  ],
  [
    "Ximena Osorio Pineda",
    "CC 54863324",
    "310 108 7269",
    "ximena.osorio@example.com",
    "Madre",
    [
      12
    ]
  ],
  [
    "Yesenia Correa Cortés",
    "CC 2086028777",
    "325 533 4730",
    "yesenia.correa@example.com",
    "Madre",
    [
      146
    ]
  ],
  [
    "Yesenia Martínez Navarro",
    "CC 15034302",
    "316 887 2924",
    "yesenia.martinez2@example.com",
    "Madre",
    [
      153
    ]
  ],
  [
    "Yesenia Mónica Martínez López",
    "CC 9897726572",
    "329 531 2056",
    "yesenia.martinez@example.com",
    "Madre",
    [
      55,
      93,
      167
    ]
  ],
  [
    "Yesenia Tamayo Moreno",
    "CC 19829658",
    "321 998 7456",
    "yesenia.tamayo@example.com",
    "Madre",
    [
      69
    ]
  ],
  [
    "Álvaro Herrera Ríos",
    "CC 65137085",
    "307 746 5397",
    "alvaro.herrera@example.com",
    "Padre",
    [
      139
    ]
  ],
  [
    "Álvaro Zapata Medina",
    "CC 7253883220",
    "304 161 2896",
    "alvaro.zapata@example.com",
    "Padre",
    [
      18
    ]
  ],
  [
    "Ángela Cárdenas Beltrán",
    "CC 92549603",
    "318 320 8576",
    "angela.cardenas@example.com",
    "Madre",
    [
      14
    ]
  ],
  [
    "Ángela Martha Ruiz Jiménez",
    "CC 54913001",
    "310 418 1205",
    "angela.ruiz@example.com",
    "Madre",
    [
      102
    ]
  ],
  [
    "Óscar Escobar Gutiérrez",
    "CC 6464360409",
    "308 923 7906",
    "oscar.escobar@example.com",
    "Tío",
    [
      3
    ]
  ],
  [
    "Óscar Patiño Giraldo",
    "CC 21206461",
    "326 913 4277",
    "oscar.patino@example.com",
    "Padre",
    [
      35
    ]
  ],
  [
    "Óscar Vélez Salazar",
    "CC 6730238233",
    "311 437 5622",
    "oscar.velez@example.com",
    "Padre",
    [
      76
    ]
  ]
];
export const RAW_TEACHERS: any[] = [
  [
    "Felipe Sandoval Ortiz",
    "CC 8761139967",
    "303 700 9038",
    "felipe.sandoval@liceopaola.com",
    "Matemáticas (1° a 5°)",
    "1° Primaria",
    "Prof. Felipe Sandoval"
  ],
  [
    "Alejandro Medina Díaz",
    "CC 9896530597",
    "301 298 5443",
    "alejandro.medina@liceopaola.com",
    "Matemáticas (6° a 11°)",
    "6° Bachillerato",
    "Prof. Alejandro Medina"
  ],
  [
    "María Ríos Cuesta",
    "CC 7038657979",
    "328 473 5397",
    "maria.rios@liceopaola.com",
    "Lengua Castellana (1° a 5°)",
    "2° Primaria",
    "Prof. María Ríos"
  ],
  [
    "Simón Correa Sánchez",
    "CC 6935317289",
    "320 458 8498",
    "simon.correa@liceopaola.com",
    "Lengua Castellana (6° a 11°)",
    "7° Bachillerato",
    "Prof. Simón Correa"
  ],
  [
    "Diana Parra Moreno",
    "CC 1202355699",
    "329 568 8052",
    "diana.parra@liceopaola.com",
    "Ciencias Naturales (1° a 5°)",
    "3° Primaria",
    "Prof. Diana Parra"
  ],
  [
    "Joaquín Ortiz Núñez",
    "CC 5072354616",
    "307 426 1440",
    "joaquin.ortiz@liceopaola.com",
    "Ciencias Naturales (6° a 9°); Física (10° a 11°); Química (10° a 11°)",
    "8° Bachillerato",
    "Prof. Joaquín Ortiz"
  ],
  [
    "Leonardo Patiño Marín",
    "CC 1742184657",
    "304 307 7767",
    "leonardo.patino@liceopaola.com",
    "Geometría y Estadística (6° a 9°); Plan Lector (1° a 5°); Emprendimiento (6° a 9°); Economía y Política (10° a 11°); Investigación (10° a 11°)",
    "No coordina grado",
    "Prof. Leonardo Patiño"
  ],
  [
    "Nubia Rincón Patiño",
    "CC 2417239641",
    "308 539 8889",
    "nubia.rincon@liceopaola.com",
    "Ciencias Sociales (1° a 5°)",
    "4° Primaria",
    "Prof. Nubia Rincón"
  ],
  [
    "Kevin Gaviria Cardona",
    "CC 5568841883",
    "310 319 9058",
    "kevin.gaviria@liceopaola.com",
    "Ciencias Sociales (6° a 11°); Filosofía (10° a 11°)",
    "9° Bachillerato",
    "Prof. Kevin Gaviria"
  ],
  [
    "Laura Osorio Suárez",
    "CC 6313285887",
    "300 365 3768",
    "laura.osorio@liceopaola.com",
    "Inglés (1° a 5°)",
    "5° Primaria",
    "Prof. Laura Osorio"
  ],
  [
    "Sandra Trujillo Muñoz",
    "CC 1782361198",
    "324 200 1142",
    "sandra.trujillo@liceopaola.com",
    "Inglés (6° a 11°)",
    "10° Bachillerato",
    "Prof. Sandra Trujillo"
  ],
  [
    "Tomás Bonilla Vargas",
    "CC 3878045365",
    "305 462 7353",
    "tomas.bonilla@liceopaola.com",
    "Educación Física (1° a 5°)",
    "No coordina grado",
    "Prof. Tomás Bonilla"
  ],
  [
    "Yuliana Rodríguez Torres",
    "CC 94709795",
    "310 978 1114",
    "yuliana.rodriguez@liceopaola.com",
    "Educación Artística (1° a 5°); Ética y Valores (1° a 5°); Religión (1° a 5°)",
    "No coordina grado",
    "Prof. Yuliana Rodríguez"
  ],
  [
    "Yesenia Cuesta Salazar",
    "CC 9622450214",
    "312 227 2598",
    "yesenia.cuesta@liceopaola.com",
    "Educación Artística (6° a 11°); Ética y Valores (6° a 11°); Religión (6° a 11°)",
    "11° Bachillerato",
    "Prof. Yesenia Cuesta"
  ],
  [
    "Luis Muñoz Rincón",
    "CC 41967539",
    "320 509 9908",
    "luis.munoz@liceopaola.com",
    "Informática (1° a 11°)",
    "No coordina grado",
    "Prof. Luis Muñoz"
  ],
  [
    "Antonella Sánchez Trujillo",
    "CC 41045349",
    "306 197 8176",
    "antonella.sanchez@liceopaola.com",
    "Educación Física (6° a 11°)",
    "No coordina grado",
    "Prof. Antonella Sánchez"
  ]
];
export const RAW_ADMINS: any[] = [
  [
    "Hernán Campos Patiño",
    "CC 59962699",
    "316 376 2170",
    "hernan.campos@liceopaola.com",
    "Rector"
  ],
  [
    "Daniela Marín Trujillo",
    "CC 75480926",
    "321 215 6953",
    "daniela.marin@liceopaola.com",
    "Coordinadora Académica"
  ],
  [
    "Carlos Castro Muñoz",
    "CC 6417806627",
    "303 654 8990",
    "carlos.castro@liceopaola.com",
    "Coordinador de Convivencia"
  ],
  [
    "Marcela Vélez Ortiz",
    "CC 9349674246",
    "317 230 9374",
    "marcela.velez@liceopaola.com",
    "Psicóloga"
  ],
  [
    "Samantha Ruiz Sánchez",
    "CC 1726239930",
    "304 445 5366",
    "samantha.ruiz@liceopaola.com",
    "Secretaria Académica"
  ],
  [
    "Claudia Rojas Torres",
    "CC 26488748",
    "317 344 7151",
    "claudia.rojas@liceopaola.com",
    "Tesorera (Pagaduría)"
  ],
  [
    "María Herrera Zapata",
    "CC 56826939",
    "302 108 9671",
    "maria.herrera@liceopaola.com",
    "Auxiliar Administrativa"
  ],
  [
    "Sofía Arango Arango",
    "CC 41650029",
    "309 886 7207",
    "sofia.arango@liceopaola.com",
    "Bibliotecaria"
  ],
  [
    "Joaquín Escobar García",
    "CC 8077678382",
    "301 653 8808",
    "joaquin.escobar@liceopaola.com",
    "Auxiliar de Cartera y Admisiones"
  ],
  [
    "Fabián Henao Correa",
    "CC 4762368213",
    "300 765 5680",
    "fabian.henao@liceopaola.com",
    "Coordinador de Tecnología y Soporte"
  ]
];

export const SCHEDULES: Record<string, GradeSchedule> = {
  "1": [
    [
      [
        "Dirección de Grupo",
        0
      ],
      [
        "Inglés",
        9
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Educación Artística",
        12
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Plan Lector",
        6
      ]
    ],
    [
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Inglés",
        9
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Plan Lector",
        6
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Informática",
        14
      ]
    ],
    [
      [
        "Inglés",
        9
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Ética y Valores",
        12
      ],
      [
        "Ciencias Sociales",
        7
      ]
    ],
    [
      [
        "Lengua Castellana",
        2
      ],
      [
        "Inglés",
        9
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Religión",
        12
      ],
      [
        "Informática",
        14
      ]
    ],
    [
      [
        "Matemáticas",
        0
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Educación Artística",
        12
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Inglés",
        9
      ]
    ]
  ],
  "2": [
    [
      [
        "Dirección de Grupo",
        2
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Plan Lector",
        6
      ],
      [
        "Inglés",
        9
      ],
      [
        "Ética y Valores",
        12
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Matemáticas",
        0
      ]
    ],
    [
      [
        "Lengua Castellana",
        2
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Inglés",
        9
      ],
      [
        "Educación Artística",
        12
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Informática",
        14
      ],
      [
        "Ciencias Sociales",
        7
      ]
    ],
    [
      [
        "Educación Física",
        11
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Inglés",
        9
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Plan Lector",
        6
      ]
    ],
    [
      [
        "Matemáticas",
        0
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Inglés",
        9
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Informática",
        14
      ],
      [
        "Ciencias Sociales",
        7
      ]
    ],
    [
      [
        "Inglés",
        9
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Educación Artística",
        12
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Religión",
        12
      ]
    ]
  ],
  "3": [
    [
      [
        "Dirección de Grupo",
        4
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Plan Lector",
        6
      ],
      [
        "Inglés",
        9
      ],
      [
        "Ciencias Sociales",
        7
      ]
    ],
    [
      [
        "Inglés",
        9
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Informática",
        14
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Educación Artística",
        12
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Educación Física",
        11
      ]
    ],
    [
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Inglés",
        9
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Ética y Valores",
        12
      ],
      [
        "Plan Lector",
        6
      ],
      [
        "Educación Artística",
        12
      ]
    ],
    [
      [
        "Inglés",
        9
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Religión",
        12
      ]
    ],
    [
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Informática",
        14
      ],
      [
        "Inglés",
        9
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Lengua Castellana",
        2
      ]
    ]
  ],
  "4": [
    [
      [
        "Dirección de Grupo",
        7
      ],
      [
        "Informática",
        14
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Inglés",
        9
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Educación Artística",
        12
      ]
    ],
    [
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Plan Lector",
        6
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Inglés",
        9
      ],
      [
        "Religión",
        12
      ],
      [
        "Educación Artística",
        12
      ]
    ],
    [
      [
        "Matemáticas",
        0
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Inglés",
        9
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Informática",
        14
      ]
    ],
    [
      [
        "Educación Física",
        11
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Inglés",
        9
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Plan Lector",
        6
      ]
    ],
    [
      [
        "Lengua Castellana",
        2
      ],
      [
        "Inglés",
        9
      ],
      [
        "Ciencias Naturales",
        4
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Ética y Valores",
        12
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Matemáticas",
        0
      ]
    ]
  ],
  "5": [
    [
      [
        "Dirección de Grupo",
        9
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Inglés",
        9
      ],
      [
        "Informática",
        14
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Plan Lector",
        6
      ],
      [
        "Ciencias Naturales",
        4
      ]
    ],
    [
      [
        "Matemáticas",
        0
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Inglés",
        9
      ],
      [
        "Informática",
        14
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Ciencias Naturales",
        4
      ]
    ],
    [
      [
        "Lengua Castellana",
        2
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Inglés",
        9
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Plan Lector",
        6
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Ciencias Naturales",
        4
      ]
    ],
    [
      [
        "Educación Artística",
        12
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Ciencias Sociales",
        7
      ],
      [
        "Inglés",
        9
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Educación Física",
        11
      ],
      [
        "Ciencias Naturales",
        4
      ]
    ],
    [
      [
        "Educación Artística",
        12
      ],
      [
        "Religión",
        12
      ],
      [
        "Matemáticas",
        0
      ],
      [
        "Inglés",
        9
      ],
      [
        "Lengua Castellana",
        2
      ],
      [
        "Ética y Valores",
        12
      ],
      [
        "Ciencias Sociales",
        7
      ]
    ]
  ],
  "6": [
    [
      [
        "Dirección de Grupo",
        1
      ],
      [
        "Geometría y Estadística",
        6
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Inglés",
        10
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Informática",
        14
      ],
      [
        "Matemáticas",
        1
      ]
    ],
    [
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Emprendimiento",
        6
      ],
      [
        "Religión",
        13
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Ética y Valores",
        13
      ]
    ],
    [
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Inglés",
        10
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Educación Artística",
        13
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Ciencias Sociales",
        8
      ]
    ],
    [
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Inglés",
        10
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Geometría y Estadística",
        6
      ],
      [
        "Ciencias Sociales",
        8
      ]
    ],
    [
      [
        "Matemáticas",
        1
      ],
      [
        "Educación Artística",
        13
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Inglés",
        10
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Informática",
        14
      ],
      [
        "Lengua Castellana",
        3
      ]
    ]
  ],
  "7": [
    [
      [
        "Dirección de Grupo",
        3
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Ética y Valores",
        13
      ],
      [
        "Educación Artística",
        13
      ]
    ],
    [
      [
        "Inglés",
        10
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Religión",
        13
      ],
      [
        "Emprendimiento",
        6
      ]
    ],
    [
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Inglés",
        10
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Informática",
        14
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Educación Artística",
        13
      ],
      [
        "Ciencias Naturales",
        5
      ]
    ],
    [
      [
        "Geometría y Estadística",
        6
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Inglés",
        10
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Ciencias Naturales",
        5
      ]
    ],
    [
      [
        "Lengua Castellana",
        3
      ],
      [
        "Informática",
        14
      ],
      [
        "Inglés",
        10
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Geometría y Estadística",
        6
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Matemáticas",
        1
      ]
    ]
  ],
  "8": [
    [
      [
        "Dirección de Grupo",
        5
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Educación Artística",
        13
      ],
      [
        "Inglés",
        10
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Ciencias Sociales",
        8
      ]
    ],
    [
      [
        "Matemáticas",
        1
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Inglés",
        10
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Geometría y Estadística",
        6
      ],
      [
        "Ciencias Sociales",
        8
      ]
    ],
    [
      [
        "Lengua Castellana",
        3
      ],
      [
        "Geometría y Estadística",
        6
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Informática",
        14
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Inglés",
        10
      ]
    ],
    [
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Informática",
        14
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Emprendimiento",
        6
      ],
      [
        "Educación Artística",
        13
      ],
      [
        "Educación Física",
        15
      ]
    ],
    [
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Religión",
        13
      ],
      [
        "Ética y Valores",
        13
      ],
      [
        "Inglés",
        10
      ]
    ]
  ],
  "9": [
    [
      [
        "Dirección de Grupo",
        8
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Educación Artística",
        13
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Inglés",
        10
      ]
    ],
    [
      [
        "Lengua Castellana",
        3
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Ética y Valores",
        13
      ],
      [
        "Inglés",
        10
      ],
      [
        "Educación Física",
        15
      ]
    ],
    [
      [
        "Matemáticas",
        1
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Geometría y Estadística",
        6
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Inglés",
        10
      ],
      [
        "Informática",
        14
      ],
      [
        "Educación Física",
        15
      ]
    ],
    [
      [
        "Lengua Castellana",
        3
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Educación Artística",
        13
      ],
      [
        "Religión",
        13
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Inglés",
        10
      ]
    ],
    [
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Geometría y Estadística",
        6
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Informática",
        14
      ],
      [
        "Ciencias Naturales",
        5
      ],
      [
        "Emprendimiento",
        6
      ]
    ]
  ],
  "10": [
    [
      [
        "Dirección de Grupo",
        10
      ],
      [
        "Inglés",
        10
      ],
      [
        "Informática",
        14
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Filosofía",
        8
      ],
      [
        "Física",
        5
      ],
      [
        "Lengua Castellana",
        3
      ]
    ],
    [
      [
        "Economía y Política",
        6
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Química",
        5
      ],
      [
        "Educación Artística",
        13
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Física",
        5
      ]
    ],
    [
      [
        "Inglés",
        10
      ],
      [
        "Química",
        5
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Ética y Valores",
        13
      ]
    ],
    [
      [
        "Inglés",
        10
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Religión",
        13
      ],
      [
        "Investigación",
        6
      ],
      [
        "Física",
        5
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Lengua Castellana",
        3
      ]
    ],
    [
      [
        "Informática",
        14
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Economía y Política",
        6
      ],
      [
        "Química",
        5
      ],
      [
        "Inglés",
        10
      ],
      [
        "Filosofía",
        8
      ]
    ]
  ],
  "11": [
    [
      [
        "Dirección de Grupo",
        13
      ],
      [
        "Física",
        5
      ],
      [
        "Inglés",
        10
      ],
      [
        "Investigación",
        6
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Química",
        5
      ]
    ],
    [
      [
        "Filosofía",
        8
      ],
      [
        "Inglés",
        10
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Informática",
        14
      ],
      [
        "Economía y Política",
        6
      ],
      [
        "Química",
        5
      ],
      [
        "Lengua Castellana",
        3
      ]
    ],
    [
      [
        "Educación Física",
        15
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Educación Artística",
        13
      ],
      [
        "Física",
        5
      ],
      [
        "Inglés",
        10
      ],
      [
        "Lengua Castellana",
        3
      ]
    ],
    [
      [
        "Matemáticas",
        1
      ],
      [
        "Educación Física",
        15
      ],
      [
        "Economía y Política",
        6
      ],
      [
        "Informática",
        14
      ],
      [
        "Ciencias Sociales",
        8
      ],
      [
        "Química",
        5
      ],
      [
        "Ética y Valores",
        13
      ]
    ],
    [
      [
        "Inglés",
        10
      ],
      [
        "Filosofía",
        8
      ],
      [
        "Religión",
        13
      ],
      [
        "Física",
        5
      ],
      [
        "Lengua Castellana",
        3
      ],
      [
        "Matemáticas",
        1
      ],
      [
        "Educación Física",
        15
      ]
    ]
  ]
};

export const TIME_SLOTS: [label: string, start: string, end: string, periodIndex: number | null][] = [
  ["Formación y bienvenida", "07:00", "07:20", null],
  ["Clase 1", "07:20", "08:10", 0],
  ["Clase 2", "08:10", "09:00", 1],
  ["Descanso (30 min)", "09:00", "09:30", null],
  ["Clase 3", "09:30", "10:20", 2],
  ["Clase 4", "10:20", "11:10", 3],
  ["Descanso (20 min)", "11:10", "11:30", null],
  ["Clase 5", "11:30", "12:20", 4],
  ["Clase 6", "12:20", "01:10", 5],
  ["Descanso (10 min)", "01:10", "01:20", null],
  ["Clase 7", "01:20", "02:00", 6],
];

export const MONTHLY_TUITION_FEE = 280000;

export const STUDENTS: Student[] = RAW_STUDENTS.map((a: any, i: number) => {
  const late = (i % 9 === 4 || i % 13 === 7);
  return {
    id: i,
    n: String(a[0]),
    doc: String(a[1]),
    age: Number(a[2]),
    sex: a[3] as "Masculino" | "Femenino",
    gn: Number(a[4]),
    g: String(a[5]),
    ac: a[6] as number[],
    paid: !late,
    debt: late ? (i % 2 ? 1 : 2) : 0,
    nfcCode: "LPP-2026-" + String(8800 + i).padStart(5, "0"),
  };
});

export const GUARDIANS: Guardian[] = RAW_GUARDIANS.map((c: any, i: number) => ({
  id: i,
  n: String(c[0]),
  doc: String(c[1]),
  tel: String(c[2]),
  mail: String(c[3]),
  rel: String(c[4]),
  kids: c[5] as number[],
}));

export const TEACHERS: Teacher[] = RAW_TEACHERS.map((p: any, i: number) => ({
  id: i,
  n: String(p[0]),
  doc: String(p[1]),
  tel: String(p[2]),
  mail: String(p[3]),
  asig: String(p[4]),
  coord: String(p[5]),
  short: String(p[6]),
}));

export const ADMINS: AdminStaff[] = RAW_ADMINS.map((m: any, i: number) => ({
  id: i,
  n: String(m[0]),
  doc: String(m[1]),
  tel: String(m[2]),
  mail: String(m[3]),
  ocup: String(m[4]),
}));
