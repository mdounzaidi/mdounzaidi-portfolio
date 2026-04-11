import React, { useEffect, useState } from "react";

function Eyes() {
  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      // Mouse position from the window
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      // Mouse position from the center of the window
      let deltaX = mouseX - window.innerWidth / 2;
      let deltaY = mouseY - window.innerHeight / 2;

      // Calculate the angle (convert from radians to degrees) => 1 radian = 180 / Math.PI
      var angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      // Update the rotation
      setRotate(angle );
    });
  });

  return (
    <div className="eyes w-full h-[300px] md:h-[800px] overflow-hidden">
      <div
        data-scroll
        data-scroll-section
        data-scroll-speed="-0.5"
        className="w-full relative h-[20vh] sm:h-screen bg-cover bg-center bg-[#004D43]"
      >
        <div className="absolute flex gap-10 top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
          <div className="w-[24vw] md:w-[15vw] h-[24vw] md:h-[15vw] flex items-center justify-center bg-zinc-100 rounded-full">
            <div className="w-4/5 h-4/5 relative rounded-full bg-zinc-900">

              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                  transformOrigin: "center center",
                }}
                className="absolute top-1/2 left-1/2 w-full h-full"
              >
                <div className="absolute top-1/2 right-6 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-100"></div>
              </div>
            </div>
          </div>
          <div className="w-[24vw] md:w-[15vw] h-[24vw] md:h-[15vw] flex items-center justify-center bg-zinc-100 rounded-full">
            <div className="w-4/5 h-4/5 relative rounded-full bg-zinc-900">
              <div
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                  transformOrigin: "center center",
                }}
                className="absolute top-1/2 left-1/2 w-full h-full"
              >
                <div className="absolute top-1/2 right-6 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Eyes;
