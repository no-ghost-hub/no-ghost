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
      <div className="gap-x-xs gap-y-m grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
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
              <li>Export as JPG at 90% quality</li>
              <li>Use!</li>
            </ol>
          </div>
        </div>
        <div className="gap-s grid">
          <Text tag="h2" typo="md">
            Videos
          </Text>
          <div className="gap-s grid">
            <Text>
              Format: 4K. <br />
              Frames per second: 50-100 or 60-120. Higher frames for slow
              motion. <br />
              Shutter speed: Always locked to double the frame rate: e.g. 50fps,
              100 shutter speed. <br />
              ISO: 0-400 to keep noise ay bay. <br />
              White balance: keep consistent and adjust in post (Lightroom).
              Usually "Sunlight". <br />
              Ratio: shoot at maximum resolution, 4:3 on iPhone. Crop to
              vertical 4:5. <br />
              Framing: it needs to look good if cropped to a square. <br />
              Lens: usually standard wide angle if on iPhone.
            </Text>
            <ol className="list-decimal pl-[3ch]">
              <li>Shoot using iPhone Blackmagic Camera app</li>
              <li>Send footage to computer with Airdrop or other system</li>
              <li>Assembly and editing using Premiere Pro or Capcut</li>
              <li>Export as H264 mp4 1080p files</li>
              <li>Use!</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GuidelinesPage;
