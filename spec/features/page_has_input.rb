require 'spec_helper'
# require 'capybara/rspec'

describe Hash do
  it "should return a blank instance" do
    Hash.new.should == {}
  end
end

describe ApplicationController do
#   render_views
it "should have the right title" do
#       get 'home'
      response.should have_selector("title", :content => "Ruby on Rails: Welcome aboard")
    end
    end
