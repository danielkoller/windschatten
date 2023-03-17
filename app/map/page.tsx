import Map from './Map';

export const metadata = {
  title: 'Map by Windschatten',
  description:
    'This is the map page of Windschatten. Here you can see the best route for you to take to work and home by bicycle. You also get infos about the duration of your trip and the amount of CO2 and money you save by using your bike instead of your car.',
};

export default function MapPage() {
  return (
    <div>
      <Map />
    </div>
  );
}
