import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useLoading } from './hooks/useLoading';
import { Loading } from './components';

const App = () => {
    const { isLoading } = useLoading();

    return (
        <>
            {isLoading && <Loading />}
            <RouterProvider router={router} />
        </>
    );
};

export default App;
