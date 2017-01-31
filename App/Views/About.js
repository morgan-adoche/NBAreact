import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native';

import Analytics from 'mobile-center-analytics';
import Crashes from 'mobile-center-crashes';
import CodePush from 'react-native-code-push';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logs: ['Code Push logs'] }
    }

    trackEvent() {
        Analytics.trackEvent('My Custom Event', {
            prop1: new Date().toISOString(),
        });
    }

    nativeCrash() {
        Crashes.generateTestCrash();
    }

    jsCrash() {
        this.function1();
    }

    function1() {
        this.function2();
    }

    function2() {
        throw new Error('My custom error');
    }

    sync() {
        this.setState({ logs: ['Sync started at ' + new Date()] })
        CodePush.sync({
            installMode: CodePush.InstallMode.IMMEDIATE,
            updateDialog: true
        }, (status) => {
            for (var key in CodePush.SyncStatus) {
                if (status === key) {
                    this.setState({ logs: [...this.state.logs, key.replace(/_/g, ' ')] });
                    break;
                }
            }
        });
    }

    render() {
        return (
            <View>
                <Button title="Track Event" onPress={() => this.trackEvent()} />
                <Button title="Test Native Crashes" onPress={() => this.nativeCrash()} />
                <Button title="Test JS Crash" onPress={() => this.jsCrash()} />
                <Button title="Code Push Sync" onPress={() => this.sync()} />
                {this.state.logs.map((log, i) => <Text key={i}>{log}</Text>)}
            </View>
        );
    }
}