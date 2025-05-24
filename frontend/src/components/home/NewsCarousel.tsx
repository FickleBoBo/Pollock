const NewsCarousel = () => {
  return (
    <div className="bg-green-600">
      <div className="flex gap-4">
        <div>
          <div className="p-2 text-center">뉴스 1</div>
          <img src="/test.jpg" className="w-full h-auto" />
        </div>
        <div>
          <div className="p-2 text-center">뉴스 2</div>
          <img src="/test.jpg" className="w-full h-auto" />
        </div>
        <div>
          <div className="p-2 text-center">뉴스 3</div>
          <img src="/test.jpg" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;
