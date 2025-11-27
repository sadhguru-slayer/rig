import React from 'react';
import { Briefcase, Users, UserCheck, MapPin } from 'lucide-react';
import GsapReveal from '@/components/GsapReveal';

const achievements = [
    {
        icon: Briefcase,
        count: '500+',
        label: 'Projects Completed',
    },
    {
        icon: Users,
        count: '470+',
        label: 'Satisfied Customers',
    },
    {
        icon: UserCheck,
        count: '20+',
        label: 'Experienced Team Members',
    },
    {
        icon: MapPin,
        count: 'Hyderabad',
        label: 'Service Locations',
    },
];

const Achievements = () => {
    return (
        <section className="py-12 bg-gradient-to-br from-teal-50 to-sky-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <GsapReveal triggerOnView>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {achievements.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-teal-100"
                                >
                                    <div className="w-14 h-14 mb-4 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                                        <Icon size={28} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-teal-700 mb-1">
                                        {item.count}
                                    </h3>
                                    <p className="text-gray-600 font-medium text-sm">
                                        {item.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </GsapReveal>
            </div>
        </section>
    );
};

export default Achievements;
