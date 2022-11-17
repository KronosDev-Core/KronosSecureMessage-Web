import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Search from '../../Icon/Search';
import Stories from './Stories';

const schemaSearch = z
  .object({
    search: z.string(),
  })
  .required();

type SearchData = z.infer<typeof schemaSearch>;

const App = () => {
  // const { data, error, loading } = useQuery(GET_USER);
  const data = useParams(); // "/app/x" => { id: "x" }
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating, isSubmitting },
  } = useForm<SearchData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schemaSearch),
    delayError: 1000,
  });

  const onSubmit: SubmitHandler<SearchData> = (data) => {
    console.log(
      'data: ',
      data,
      '\nerrors: ',
      errors,
      '\nvalid: ',
      isValidating,
    );
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-5 overflow-y-auto" onScroll={(evt) => console.log("evt :", evt)}>
      <form
        className="flex flex-row gap-4 h-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          icon={<Search className="w-6" />}
          placeholder="Search"
          type="text"
          name="search"
          aria-invalid={errors.search ? 'true' : 'false'}
          error={errors.search?.message as String}
          ref={register('search')}
        />
        <Button type="submit">
          <Search className="py-[2.8px] w-8 h-8 my-auto" />
        </Button>
      </form>
      <Stories />
    </div>
  );
};

export default App;
