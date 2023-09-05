import BeatLoader from "react-spinners/BeatLoader";

export default function LoadingScreen({ isLoading }) {
  return (
    <BeatLoader
      loading={isLoading}
      color="#E43F6F"
      size={35}
      cssOverride={{
        top: "50%",
        left: "50%",
        position: "fixed",
        transform: "translate(-50%, -50%)",
      }}
      speedMultiplier={2}
    />
  );
}
