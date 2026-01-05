import { FC } from 'react';
import { StyleSheet } from 'react-native';
import Page from '../UI/Page';
import FirstVisit from '../components/FirstVisit';

interface Props { }

const Home: FC<Props> = () => {
    return <Page style={styles.container}>
        <FirstVisit />
    </Page>
}

const styles = StyleSheet.create({
    container: {}
})

export default Home;