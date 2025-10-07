import "boxicons/css/boxicons.min.css";
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section
      className="flex flex-col lg:flex-row items-center justify-between 
                 min-h-[calc(90vh-6rem)] px-4 sm:px-6 lg:px-8 
                 mt-10 lg:mt-20 relative">

      {/* Contenido de texto */}
      <div className="z-10 text-left max-w-xl">
        {/* Botón de introducción */}
        <div className="relative w-fit bg-gradient-to-r from-[#656565] to-[#e99b63] 
                        shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full p-[2px]">
          <div className="bg-black rounded-full flex items-center justify-center px-5 py-2">
            <i className='bx bxs-diamond mr-2 text-[#e99b63]'></i>
            <span className="text-sm text-white">¡Comienza ya!</span>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider mt-8">
          ORIENTACIÓN VOCACIONAL<br /> PARA TODOS
        </h1>

        {/* Descripción */}
        <p className="text-base sm:text-lg tracking-wider text-gray-400 mt-4 max-w-md">
          La mejor plataforma web para la orientación vocacional integrada con ayuda de la inteligencia artificial.
        </p>
      </div>

      {/* 3D Robot */}
      <div className="w-full lg:w-[45%] mt-12 lg:mt-0 flex justify-center lg:justify-end">
        <Spline
          className="w-full h-[400px] lg:h-[500px]"
          scene="https://prod.spline.design/KFfQUE95SIab8qAr/scene.splinecode"
        />
      </div>

    </section>
  );
};

export default Hero;
