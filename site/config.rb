# Customize directory structure
# https://middlemanapp.com/advanced/configuration/

set :source, 'src'
set :fonts_dir, 'fonts'
set :images_dir, 'assets'
set :layouts_dir, 'layouts'
set :css_dir, 'scss'
set :js_dir, 'js'
set :index_file, 'index.html'
set :build_dir, '.tmp/build/'

# Configure environments
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :development do
  ignore 'ts/*'
  ignore 'index.ts'
  activate :livereload
end

configure :build do
  ignore 'ts/*'
  ignore 'index.ts'
  activate :minify_css
  activate :minify_html, preserve_line_breaks: true
  activate :minify_javascript, compressor: Terser.new
  activate :asset_hash
end

# Activate and configure webpack
# https://middlemanapp.com/advanced/external-pipeline/

activate :external_pipeline,
  name: :webpack,
  command: build? ? 'npm run build' : 'npm run start',
  source: ".tmp/dist/",
  latency: 1

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Set default layouts
# https://middlemanapp.com/basics/layouts/

set :layout, 'head'
