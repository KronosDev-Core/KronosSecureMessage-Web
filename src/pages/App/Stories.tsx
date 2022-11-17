import { FC, useState } from 'react';

const Stories: FC = (): JSX.Element => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Story 1',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 2,
      name: 'Story 2',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 3,
      name: 'Story 3',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 4,
      name: 'Story 4',
      img: 'https://picsum.photos/200/300',
      view: true,
    },
    {
      id: 5,
      name: 'Story 5',
      img: 'https://picsum.photos/200/300',
      view: true,
    },
    {
      id: 6,
      name: 'Story 6',
      img: 'https://picsum.photos/200/300',
      view: true,
    },
    {
      id: 7,
      name: 'Story 7',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 8,
      name: 'Story 8',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 9,
      name: 'Story 9',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 10,
      name: 'Story 10',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 11,
      name: 'Story 11',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 12,
      name: 'Story 12',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 13,
      name: 'Story 13',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 14,
      name: 'Story 14',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 15,
      name: 'Story 15',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
    {
      id: 16,
      name: 'Story 16',
      img: 'https://picsum.photos/200/300',
      view: false,
    },
  ]);

  const handleView = (id: number) => {
    setData(data => data.map(item => (item.id === id ? { ...item, view: true } : item)));
  };

  const Storie: FC<{ id: number; name: string; img: string; view: boolean; callback: (id: number) => any }> = ({
    id,
    name,
    img,
    view,
    callback,
  }): JSX.Element => {

    const handleViewStorie = () => {
      callback(id);
    };
    
    return (
    <div className="flex flex-col items-center justify-center w-24 h-24 gap-2" onClick={handleViewStorie} aria-hidden="true">
      <img className={"w-16 h-16 rounded-full ring-2 ring-offset-2 ring-offset-[#FBF5F3] transition-all easy-in-out duration-300 " + (view ? "ring-[#000022]/20" : "ring-[#65A46D]")} src={img} alt={name} />
      <p className="text-sm font-semibold">{name}</p>
    </div>
  )};

  return (
    <div className="w-full overflow-x-scroll shadow-inner rounded-lg mt-4 -mx-5">
      <div className="inline-flex justify-start w-fit py-4 pl-1">
        {data.filter(elem => !elem.view).map((item) => (
          <Storie key={item.id} id={item.id} name={item.name} img={item.img} view={item.view} callback={handleView} />
        ))}
        {data.filter(elem => elem.view).map((item) => (
          <Storie key={item.id} id={item.id} name={item.name} img={item.img} view={item.view} callback={handleView} />
        ))}
      </div>
    </div>
  );
};

export default Stories;
