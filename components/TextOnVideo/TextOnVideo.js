export default function TextOnVideo({ text }) {
  return (
    <div className={`md:w-96 uppercase relative font-extrabold mr-96`}>
      <div className="uppercase text-2xl mb-3">smartbolla</div>
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
    </div>
  );
}
