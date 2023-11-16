import * as SC from './styles'
import {RotatingLines} from "react-loader-spinner";

export const Loader = () =>
    <SC.LoaderWrapper>
        <RotatingLines />
    </SC.LoaderWrapper>