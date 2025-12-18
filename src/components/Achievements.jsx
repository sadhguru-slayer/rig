'use client'
import React from 'react';
import { Briefcase, Users, UserCheck, Clock } from 'lucide-react';
import CountUp from 'react-countup';

const achievements = [
    { icon: Briefcase, count: '500+', label: 'Projects Completed' },
    { icon: Users, count: '470+', label: 'Satisfied Customers' },
    { icon: UserCheck, count: '20+', label: 'Team Members' },
    { icon: Clock, count: '8+', label: 'Years of Experience' },
];

const Achievements = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    {achievements.map((item, index) => {
                        const Icon = item.icon;
                        const isNumeric = /\d/.test(item.count);
                        const numericValue = isNumeric ? parseInt(item.count.replace(/\D/g, '')) : 0;
                        const suffix = isNumeric ? item.count.replace(/\d/g, '') : '';

                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="mb-4 flex items-center justify-center">
                                    <Icon
                                        size={32}
                                        className="text-teal-600 stroke-[1.8]"
                                    />
                                </div>

                                <h3 className="text-4xl font-bold text-teal-800">
                                    {isNumeric ? (
                                        <CountUp
                                            end={numericValue}
                                            duration={2.5}
                                            suffix={suffix}
                                            enableScrollSpy
                                            scrollSpyOnce
                                        />
                                    ) : (
                                        item.count
                                    )}
                                </h3>

                                <p className="text-gray-500 text-sm mt-1">
                                    {item.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
