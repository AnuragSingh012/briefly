import { useEffect, useState } from "react";
import { linkIcon, submitIcon, copyIcon, tickIcon, Loader } from "../assets";

const Summary = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [article, setArticle] = useState({
    url: "",
    lang: "en",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const apiURL = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(
      article.url
    )}&lang=${article.lang}&engine=2`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": { apiKey },
        "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(apiURL, options);
      const data = await response.json();
      console.log(data);
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedArticles);
      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    } catch (err) {
      setError(`Error fetching data: ${err}`);
    }
    setLoading(false);
  };

  return (
    <section className="mt-16 w-full max-w-2xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            className="absolute left-0 my-2 ml-3 w-5 h-5 object-contain"
            src={linkIcon}
            alt="link-icon"
          />
          <input
            name="url"
            onChange={(e) =>
              setArticle({ ...article, [e.target.name]: e.target.value })
            }
            className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-[8rem] shadow-lg font-medium focus:border-gray-300 peer focus:outline-none focus:ring-0"
            type="url"
            placeholder="Paste the URL"
            value={article.url}
            required
          />
          <select
            onChange={(e) =>
              setArticle({ ...article, [e.target.name]: e.target.value })
            }
            className="absolute text-sm font-semibold right-0 mr-14"
            name="lang"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
          <button
            className="absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-9 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-blue-600 peer-focus:text-blue-600"
            type="submit"
          >
            <img src={submitIcon} alt="submit-icon" />
          </button>
        </form>

        {/* Browse summary */}

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.reverse().map((item, index) => (
            <div
              key={index}
              onClick={() => setArticle(item)}
              className="p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer"
            >
              <div
                onClick={() => handleCopy(item.url)}
                className="w-7 h-7 rounded-md bg-gray-100 flex justify-center items-center cursor-pointer"
              >
                <img
                  className="w-3 h-3 object-contain"
                  src={copied === item.url ? tickIcon : copyIcon}
                  alt={copied === item.url ? "tick-icon" : "copy-icon"}
                />
              </div>
              <p className="flex-1 text-blue-700 text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>

        {/* Display Result */}
        <div>
          {loading ? (
            <div className="flex justify-center items-center mt-12">
              <img className="w-12 h-12" src={Loader} alt="" />
            </div>
          ) : error ? (
            <p className="text-center max-w-lg m-auto font-semibold mt-8 text-base mb-20">
              Oops! Something went wrong while fetching the data.
              <br />{" "}
              <span className="text-[#2a65ed]">Please try again later!</span>
              <br />
              <span>{error?.data?.error}</span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-bold text-gray-600 text-xl">
                  Article <span className="text-[#2a65ed]">Summary</span>
                </h2>
                <div className="rounded-xl mb-10 border-gray-200 bg-white/10 p-4 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
                  <p className="font-medium text-sm text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Summary;
