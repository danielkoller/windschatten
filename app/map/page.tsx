import Map from './Map';

export const metadata = {
  title: 'Windschatten',
  description: 'You will never ride alone',
};

export default function MapPage() {
  return (
    <div>
      <h1>Get your fastest route here</h1>
      <Map />
      <h2>Find other cyclists with a similar route</h2>
    </div>
  );
}
