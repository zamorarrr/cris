import { useState } from 'react';
import { Fingerprint } from 'lucide-react';

interface IllustrationFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  caption?: string;
  darkBackdrop?: boolean;
}

export function IllustrationFrame({
  src,
  alt,
  className = '',
  imgClassName = '',
  caption,
  darkBackdrop = false,
}: IllustrationFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative overflow-hidden rounded-xl border ${
          darkBackdrop
            ? 'border-white/15 bg-[#092E5D]'
            : 'border-[#D6E4F2] bg-[#EAF5FF]'
        }`}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`w-full object-cover ${imgClassName}`}
          />
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1557A6]/15 text-[#1557A6]">
              <Fingerprint className="h-6 w-6" />
            </div>
            <p
              className={`max-w-sm text-sm ${
                darkBackdrop ? 'text-[#EAF5FF]' : 'text-[#52677F]'
              }`}
            >
              {alt}
            </p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          className={`mt-2.5 text-xs leading-relaxed ${
            darkBackdrop ? 'text-[#BFD9F7]' : 'text-[#52677F]'
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
