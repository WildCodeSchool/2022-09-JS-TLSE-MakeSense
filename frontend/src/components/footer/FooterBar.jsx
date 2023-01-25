import { Text } from "../../contexts/Language";

function FooterBar() {
  return (
    <footer className="bg-blueDiane py-6 flex flex-row justify-center align-middle">
      <p className="text-white">
        <Text tid="madebymakesense" />
      </p>
    </footer>
  );
}
export default FooterBar;
