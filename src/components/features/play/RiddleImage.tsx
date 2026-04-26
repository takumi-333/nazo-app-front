type Props = {
  imageUrl?: string;
  alt?: string;
  loading?: boolean;
};

export function RiddleImage({ imageUrl, alt = "問題", loading = false }: Props) {
  return (
    <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg">
      {loading && <div className="absolute inset-0 animate-pulse bg-gray-200" />}

      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={alt}
          className={[
            "w-full h-full object-contain transition-opacity duration-300",
            "opacity-100",
          ].join(" ")}
        />
      )}
    </div>
  );
}
