import { FunctionComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Readme from './pages/home/Readme';
import Features from './pages/features/Features';

const App: FunctionComponent = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout/> }>
                <Route index element={ <Readme/> }/>
                <Route path="/features" element={ <Features/> }/>
            </Route>
        </Routes>
    </BrowserRouter>
);

export default App;
