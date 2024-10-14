interface RoomType {
    name: string;
    description: string;
    features: string[];
    color: string;
    size: string;
    capacity: string;
}

export const roomTypes: RoomType[] = [
    {
        name: "CLASSIC",
        description:
            "Das modern designte Classic-Zimmer, ist perfekt für einen bequemen Aufenthalt zu zweit. Mit insgesamt 14m² bietet dieses Zimmer großen Komfort.",
        features: [
            "Kostenloses WLAN",
            "MINI-BAR",
            "KLIMAANLAGE",
            "SPIND",
        ],
        color: "from-gray-700 to-gray-900",
        size: "14m²",
        capacity: "2 Guests",
    },
    {
        name: "COMFORT",
        description:
            "Die Kategorie „Comfort“ ist mit ca. 16m² etwas geräumiger als das Classic-Zimmer und bietet im Comfort+ Zimmer auch Platz für bis zu insgesamt drei Gäste.",
        features: [
            "Kostenloses WLAN",
            "MINI-BAR",
            "KLIMAANLAGE",
            "SPIND",
        ],
        color: "from-gray-700 to-gray-900",
        size: "16m²",
        capacity: "2 Guests",
    },
    {
        name: "COMFORT PLUS",
        description:
            "Das modern designte Comfort+-Zimmer ist perfekt für einen bequemen Aufenthalt zu dritt. Mit insgesamt 18m² bietet dieses Zimmer großen Komfort.",
        features: [
            "Kostenloses WLAN",
            "MINI-BAR",
            "KLIMAANLAGE",
            "SPIND",
        ],
        color: "from-gray-700 to-gray-900",
        size: "18m²",
        capacity: "3 Guests",
    },
    {
        name: "PREMIUM",
        description:
            "Das Premium-Zimmer bietet mit einem King-Size Bett den perfekten Komfort für Ihren Aufenthalt. Das Sofa besitzt eine integrierte Matratze und kann für einen weiteren Gast genutzt werden.",
        features: [
            "Kostenloses WLAN",
            "MINI-BAR",
            "KLIMAANLAGE",
            "SPIND",
        ],
        color: "from-gray-700 to-gray-900",
        size: "22m²",
        capacity: "3 Guests",
    },
];