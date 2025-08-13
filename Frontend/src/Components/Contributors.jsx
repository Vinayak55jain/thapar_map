import Contributions from "./Contributions";

const contributorsList = [
  { name: "John Doe", image: "/images/john.png", url: "https://youtube.com/"},
  { name: "Jane Smith", image: "/images/jane.png" },
  { name: "Alice Johnson", image: "/images/alice.png" }, 
  { name: "Alice Johnson", image: "/images/alice.png" }, 
  { name: "Alice Johnson", image: "/images/alice.png" }, 
  { name: "Alice Johnson", image: "/images/alice.png" },
  { name: "Alice Johnson", image: "/images/alice.png" },
  { name: "Alice Johnson", image: "/images/alice.png" },
];

function Contributors() {
  return (
    <>
      <Contributions people={contributorsList} />
    </>
  );
}

export default Contributors;
