import React from 'react';
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetTranslationQuery } from "../services/text";


const Translator = () => {
  const [text, setText] = React.useState({
    url: '',
    translation: '',
    lang: 'en'
  });

  console.log(text);

  const [allTranslations, setAllTranslations] = React.useState([]);

  const [getTranslation, { error, isFetching }] = useLazyGetTranslationQuery();

  React.useEffect(() => {
    const translationsFromLocalStorage = JSON.parse(
      localStorage.getItem('translations')
    );

    if (translationsFromLocalStorage) {
      setAllTranslations(translationsFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getTranslation({ url: text.url, lang: text.lang });

    if (data?.summary) {
      const newTranslation = { ...text, translation: data.summary };
      const translations = [newTranslation, ...allTranslations];
      setAllTranslations(translations);
      setText(newTranslation);
      localStorage.setItem('translations', JSON.stringify(translations));
    }
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div>
        <select value={selected} onChange={(e) => setText({...text, lang: e.target.value})}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
        </select>
      </div>

      <div className='flex flex-col w-full gap-2'>
        

        <form className='relative flex justify-center items-center'
          onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link_icon" className='absolute left-0 my-2 ml-3 w-5'></img>
          <input type='url' placeholder='enter a url' value={text.url} required
            className='url_input peer'
            onChange={(e) => setText({
              ...text, url: e.target.value
            })} />

          <button type='submit' className='submit_btn peer-focus:border-gray-600 peer-focus:text-gray-600'>
            Enter
          </button>
        </form>

        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>  
            {allTranslations.map((t,index) => (
              <div key={`link-${index}`}
                onClick={() => setText(t)}
                className='link_card'>
                <div className='copy_btn'>
                  <img src={copy} alt="copy" className='w-[40%] h-[40%] object-contain'/>
                </div>
                <p className='flex-1 font-roboto text-green-700 font-medium text-sm truncate'>
                  {t.url}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className='my-10 max-w-full flex justify-center items-center'>
        {text.translation ? (
            <div className='flex flex-col gap-3'>
              <h2 className='font-roboto font-bold text-gray-600 text-xl'>Translation <span className='green_gradient'>Summary</span></h2>
              <div className='summary_box'><p>{text.translation}</p></div>
            </div>) : isFetching && (<img src={loader} alt="loader" className='w-20 h-20 object-contain'/>)
         
                  
        } 

      </div>

    </section>
  )
}

export default Translator