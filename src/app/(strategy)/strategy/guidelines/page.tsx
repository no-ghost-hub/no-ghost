import Text from "@/components/elements/Text";

const GuidelinesPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return (
    <main className="gap-l pt-m pb-l px-xs grid">
      <div className="">
        <Text tag="h1">Guidelines</Text>
      </div>
      <div className="grid">
        <div className="gap-s grid">
          <Text tag="h2" typo="md">
            Photos
          </Text>
          <div className="gap-s grid">
            <Text>
              Format: RAW (DNG on iPhone). <br />
              Flash: generally off as part of identity imagery. <br />
              Shutter speed: if handheld aim for 1/125s to prevent blur. <br />
              ISO: 0-400 to keep noise ay bay. <br />
              White balance: keep consistent and adjust in post (Lightroom).
              Usually "Sunlight". <br />
              Ratio: shoot at maximum resolution, 4:3 on iPhone. Crop to
              vertical 4:5. <br />
              Framing: it needs to look good if cropped to a square. <br />
              Lens: usually standard wide angle if on iPhone.
            </Text>
            <ol className="list-decimal pl-[3ch]">
              <li>Shoot using iPhone Lightroom app</li>
              <li>Save from Lightroom to phone gallery</li>
              <li>
                Sync (automatic) to No Ghost Marketing Google Photos archive
              </li>
              <li>Download on computer</li>
              <li>Edit using Lightroom CC</li>
              <li>Use!</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GuidelinesPage;
