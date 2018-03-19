const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const UPower = imports.ui.status.power.UPower;

function getSettings() {
    const schema = Gio.SettingsSchemaSource.get_default()
       .lookup('org.gnome.desktop.interface', false);
    if (schema)
        return new Gio.Settings({settings_schema: schema});
}

function check() {
    const settings = getSettings();
    if (settings)
        settings.set_boolean('enable-animations',
            Main.panel.statusArea.aggregateMenu._power._proxy.State !== UPower.DeviceState.DISCHARGING);
}

let _previous_state;
let _handle;

function enable() {
    const settings = getSettings();
    if (settings)
        _previous_state = settings.get_boolean('enable-animations');
    _handle = Main.panel.statusArea.aggregateMenu._power._proxy.connect('g-properties-changed', check);
    check();
}

function disable() {
    const settings = getSettings();
    if (settings)
        settings.set_boolean('enable-animations', _previous_state);
    Main.panel.statusArea.aggregateMenu._power._proxy.disconnect(_handle);
}
