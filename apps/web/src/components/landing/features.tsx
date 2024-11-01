import { 
  UserGroupIcon, 
  CalendarIcon, 
  StarIcon, 
  BuildingStorefrontIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    title: 'Find Artists',
    description: 'Browse through profiles of talented tattoo artists in your area.',
    icon: UserGroupIcon,
  },
  {
    title: 'Easy Booking',
    description: 'Schedule appointments with your chosen artist hassle-free.',
    icon: CalendarIcon,
  },
  {
    title: 'Verified Reviews',
    description: 'Read authentic reviews from real clients.',
    icon: StarIcon,
  },
  {
    title: 'Studio Discovery',
    description: 'Explore top-rated tattoo studios near you.',
    icon: BuildingStorefrontIcon,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}