const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const UPower = imports.ui.status.power.UPower;

function check() {
    const schema = Gio.SettingsSchemaSource.get_default()
       .lookup('org.gnome.desktop.interface', false);
    if (!schema)
       return;
    const settings = new Gio.Settings({settings_schema: schema});
    settings.set_boolean('enable-animations',
        Main.panel.statusArea.aggregateMenu._power._proxy.State !== UPower.DeviceState.DISCHARGING);
}

let _handle;

function enable() {
    _handle = Main.panel.statusArea.aggregateMenu._power._proxy.connect('g-properties-changed', check);
    check();
}

function disable() {
    Main.panel.statusArea.aggregateMenu._power._proxy.disconnect(_handle);
}
