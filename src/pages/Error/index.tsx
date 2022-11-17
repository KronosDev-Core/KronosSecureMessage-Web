import { FC } from 'react';
import { useRouteError, isRouteErrorResponse,  } from 'react-router-dom';
import { ErrorResponse } from '@remix-run/router';

const Error: FC<{}> = (): JSX.Element => {
  const error: ErrorResponse = useRouteError() as ErrorResponse;
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <div>Oops</div>;
  }
};


export default Error;