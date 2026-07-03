# NoMentionz

Official website of music creator NoMentionz. Site can be viewed here: https://www.nomentionz.com/

Built with SvelteKit 5, Tailwind CSS and FontAwesome icons.


## Development

Ensure you have **Node.js** and **npm** installed. Then clone this repository.
```sh
git clone https://github.com/xRedCrystalx/nomentionz
npm install
npm run dev -- --host 0.0.0.0
```
Ensure your firewall allows port `5173` to access website in your internal network.

## Deployment:
We will host it using nodejs adapter on **systemd** supported Linux system (Debian prefered).

```sh
# On your local machine
npm build
rsync -rhP build/ {user}@{ip}:/path/to/folder/build
rsync -hP package.json site.service {user}@{ip}:/path/to/folder/

# On remote machine
npm install --omit=dev
node build
```

To start with service file:
```sh
nano /path/to/site.service  # edit service parameters and ENV variables per your configuration 

systemctl enable --now /path/to/site.service
systemctl daemon-reload
systemctl start site
systemctl status site # to see status/errors
```

# Licence
MIT - see [licence](./LICENSE)