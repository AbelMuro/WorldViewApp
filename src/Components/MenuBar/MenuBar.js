import React, {useState, useEffect} from 'react';
import Animated, {useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import {Bar, MenuLink, LinkText, Line} from './styles.js';
import {SvgXml} from 'react-native-svg'
import icons from './icons'

function MenuBar() {
    const [open, setOpen] = useState(false);
    const height = useSharedValue(0);

    const handleMenu = () => {
      setOpen(!open);
    }

    const renderLink = ({item}) => {
        return(
            <MenuLink>
                <LinkText>
                    {item}
                </LinkText>
            </MenuLink>
        )
    }

    const separator = () => {
        return (<Line></Line>)
    }

    useEffect(() => {
        if(open)
            height.value = withTiming(250, {
                duration: 200,
                easing: Easing.linear
            });
        else
            height.value = withTiming(0, {
                duration: 200,
                easing: Easing.linear
            });;    

    }, [open])

    return(
        <>
            <Bar onPress={handleMenu}>
                <SvgXml xml={icons['menu']} width='55px' height='25px' />
            </Bar>   
            <Animated.FlatList
                data={['All', 'Music', 'Funny', 'Sports', 'News', 'Other']}
                renderItem={renderLink}
                ItemSeparatorComponent={separator}
                style={{
                    width: '100%',
                    height,
                    backgroundColor: 'rgb(37, 37, 37)'
                }}
            /> 
        </>
    )    
}

export default MenuBar;