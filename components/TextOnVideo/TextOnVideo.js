export default function TextOnVideo({ text }) {
  return (
    <div
      className={`md:w-96 uppercase relative font-extrabold mr-96`}
      style={{ color: "#f6c886" }}
    >
      <div className="uppercase text-2xl mb-3">smartbolla</div>
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
    </div>
  );
}
