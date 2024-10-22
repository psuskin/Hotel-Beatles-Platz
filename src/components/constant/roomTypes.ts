interface RoomType {
    name: string;
    descriptionKey: string;
    featuresKeys: string[];
    color: string;
    size: string;
    capacityKey: string;
}

export const roomTypes: RoomType[] = [
    {
        name: "CLASSIC",
        descriptionKey: "classicDescription",
        featuresKeys: [
            "freeWifi",
            "minibar",
            "airConditioning",
            "locker",
        ],
        color: "from-gray-700 to-gray-900",
        size: "14m²",
        capacityKey: "twoGuests",
    },
    {
        name: "COMFORT",
        descriptionKey: "comfortDescription",
        featuresKeys: [
            "freeWifi",
            "minibar",
            "airConditioning",
            "locker",
        ],
        color: "from-gray-700 to-gray-900",
        size: "16m²",
        capacityKey: "twoGuests",
    },
    {
        name: "COMFORT PLUS",
        descriptionKey: "comfortPlusDescription",
        featuresKeys: [
            "freeWifi",
            "minibar",
            "airConditioning",
            "locker",
        ],
        color: "from-gray-700 to-gray-900",
        size: "18m²",
        capacityKey: "threeGuests",
    },
    {
        name: "PREMIUM",
        descriptionKey: "premiumDescription",
        featuresKeys: [
            "freeWifi",
            "minibar",
            "airConditioning",
            "locker",
        ],
        color: "from-gray-700 to-gray-900",
        size: "22m²",
        capacityKey: "threeGuests",
    },
];