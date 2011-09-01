require "rubygems"
require "sinatra"
require "mongoid"
require "json"

set :static, true
set :public, File.dirname(__FILE__) + "/app"

db_host = ENV["DBHOST"] || "localhost"
db_port = ENV["DBPORT"] || "27017"
db_name = ENV["DBNAME"] || "firestarter"
Mongoid.database = Mongo::Connection.new(db_host, db_port).db(db_name)

class GenericModel
  include Mongoid::Document
  include Mongoid::Timestamps
  before_create :set_id
  def set_id
    last = GenericModel.last
    next_id = (last.nil? ? 0 : last.id) + 1
    self.id = next_id
  end
  def build_json
    hash = {}
    self.attributes.each { |k, v| hash[k] = v }
    hash[:id] = self.id
    hash
  end
end

def find_model(klass, id)
  GenericModel.where(:_klass => klass, :_id => id.to_i).first
end

before do
  content_type :json
  expires -1, :public, :must_revalidate
end

# returns any HTML page in /app
get "/app/:filename" do |filename|
  content_type :html
  send_file File.join(settings.public, "#{filename}.html")
end

# returns a list of all models of the given klass
get "/:klass" do |klass|
  GenericModel.where(:_klass => klass).all.map(&:build_json).to_json
end

# returns a single model of the given klass
get "/:klass/:id" do |klass, id|
  find_model(klass, id).build_json.to_json
end

# adds a single model
post "/:klass" do |klass|
  model_params = JSON.parse(params[:model])
  model_params[:_klass] = klass
  GenericModel.create(model_params).build_json.to_json
end

# updates a single model
put "/:klass/:id" do |klass, id|
  current_model = find_model(klass, id)
  model_params = JSON.parse(params[:model])
  model_params[:_klass] = klass
  current_model.update_attributes(model_params)
  current_model.build_json.to_json
end

# deletes a single model
delete "/:klass/:id" do |klass, id|
  model = find_model(klass, id)
  model.delete
  true.to_json
end
