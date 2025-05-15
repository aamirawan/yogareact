

const TrustpilotReviews = () => {
  return (
    <div className="w-full h-[56px] bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between px-8 py-3">
          <div className="text-gray-600 text-sm">
            Our customers say
          </div>
          
          <div className="font-semibold text-lg">
            Excellent
          </div>
          
          <div className="flex">
            {[1, 2, 3, 4].map((star) => (
              <svg 
                key={star}
                className="w-5 h-5 text-[#00b67a]" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg 
              className="w-5 h-5 text-[#00b67a]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
              />
            </svg>
          </div>
          
          <div className="text-gray-600 text-sm">
            4.5 out of 5 based on 74,856 reviews
          </div>
          
          <div className="flex items-center">
            <svg 
              className="w-5 h-5 text-[#00b67a] mr-1" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M19.333 14.667v-4.96C19.333 5.147 15.52 1.333 11 1.333S2.667 5.147 2.667 9.707v4.96L0 17.333h7.333C7.333 19.453 8.88 21 11 21s3.667-1.547 3.667-3.667h7.333l-2.667-2.666zm-8.333 3.666c-.733 0-1.333-.6-1.333-1.333h2.666c0 .733-.6 1.333-1.333 1.333zm6.51-2.667H2.49v-5.96c0-3.893 3.147-7.04 7.04-7.04s7.04 3.147 7.04 7.04v5.96h-.88.82z" />
            </svg>
            <span className="font-semibold">Trustpilot</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustpilotReviews;
