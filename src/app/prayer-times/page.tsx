"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, Calendar } from "lucide-react";

type PrayerTimes = {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    Sunrise: string;
};

export default function PrayerTimesPage() {
    const [times, setTimes] = useState<PrayerTimes | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState("London, UK"); // Default

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const res = await fetch(`/api/prayer-times?lat=${latitude}&lng=${longitude}`);
                        const data = await res.json();
                        if (data.data) {
                            setTimes(data.data.timings);
                            setLocation("Current Location");
                        } else {
                            setError("Could not fetch times.");
                        }
                    } catch (err) {
                        setError("Failed to load prayer times.");
                    } finally {
                        setLoading(false);
                    }
                },
                (err) => {
                    console.error(err);
                    fetch(`/api/prayer-times?lat=51.5074&lng=-0.1278`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.data) setTimes(data.data.timings);
                            setLoading(false);
                        });
                }
            );
        } else {
            setLoading(false);
            setError("Geolocation not supported.");
        }
    }, []);

    const prayers = [
        { name: "Fajr", time: times?.Fajr, icon: "🌅" },
        { name: "Sunrise", time: times?.Sunrise, icon: "☀️" },
        { name: "Dhuhr", time: times?.Dhuhr, icon: "🕛" },
        { name: "Asr", time: times?.Asr, icon: "🌤️" },
        { name: "Maghrib", time: times?.Maghrib, icon: "🌇" },
        { name: "Isha", time: times?.Isha, icon: "🌙" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
            {/* Header */}
            <div className="bg-primary p-6 pb-12 rounded-b-[2.5rem] shadow-lg">
                <div className="flex justify-between items-center text-white mb-6">
                    <h1 className="text-2xl font-bold text-yellow-400">Prayer Times</h1>
                    <Clock className="opacity-80" />
                </div>

                <div className="flex items-center text-green-400 space-x-2 mb-2">
                    <MapPin size={16} />
                    <span className="text-sm font-medium text-green-400">{location}</span>
                </div>
                <div className="flex items-center text-green-400 space-x-2">
                    <Calendar size={16} />
                    <span className="text-sm font-medium text-green-400">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                </div>
            </div>

            {/* Prayer Times List */}
            <div className="px-6 -mt-8 space-y-3">
                {loading ? (
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading times...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                        {error}
                    </div>
                ) : (
                    prayers.map((prayer) => (
                        <div key={prayer.name} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{prayer.icon}</span>
                                <span className="font-semibold text-gray-700 dark:text-gray-300">{prayer.name}</span>
                            </div>
                            <span className="font-bold text-yellow-400 text-lg">{prayer.time}</span>
                        </div>
                    ))
                )}
            </div>

            <div className="text-center mt-8 text-xs text-gray-400">
                Source: Aladhan API
            </div>
        </div>
    );
}
