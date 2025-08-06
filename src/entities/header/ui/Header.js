import { data } from '../lib/data';
import { HeaderItem } from './HeaderItem';

export const Header = () => {
    console.log('data', data)
    return (
        <div>
            <HeaderItem />
        </div>
    );
    
}