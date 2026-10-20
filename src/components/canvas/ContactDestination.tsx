import { useTexture } from '@react-three/drei';

interface ContactDestinationProps {
  visible: boolean;
}

export function ContactDestination({ visible }: ContactDestinationProps) {
  const contactPlate = useTexture('/scenes/state_07_contact.jpg');

  if (!visible) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* High-Resolution Wide Panoramic Sunrise Backdrop (State 07) */}
      <mesh position={[0, 1.4, -4.5]}>
        <planeGeometry args={[22, 10]} />
        <meshBasicMaterial map={contactPlate} toneMapped={false} />
      </mesh>

      {/* Radiant Sunrise Light Source Aligned with Arch Portal */}
      <pointLight position={[0, 1.8, -4.2]} color="#fff0d4" intensity={2.8} distance={20} />
    </group>
  );
}
