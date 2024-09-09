import axios from 'axios';

const API_KEY = '61e9c01a9a52b92c80c2b58e6b74433f'; 
const CITY_ID = '2911298'; // Hamburg's city ID for OpenWeatherMap

interface WeatherResponse {
    main: {
        temp: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
}

const getWeatherIcon = (iconCode: string): string => {
    const iconMap: { [key: string]: string } = {
        '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
        '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌡️';
};

export const fetchWeather = async (): Promise<string> => {
    try {
        const response = await axios.get<WeatherResponse>(
            `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&appid=${API_KEY}&units=metric`
        );

        const temp = Math.round(response.data.main.temp);
        const description = response.data.weather[0].description;
        const icon = getWeatherIcon(response.data.weather[0].icon);

        return `Hamburg ${icon} ${temp}°C - ${description}`;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw new Error('Weather data unavailable');
    }
};
