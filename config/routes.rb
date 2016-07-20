Rails.application.routes.draw do
  devise_for :users

  resources :usersgames, only: [:index, :create, :destroy]
  resources :users, only: [:destroy]

  namespace :api do
    namespace :v1 do
      resources :games, only: [:index]
      namespace :boardgamegeek do
        resources :search, only: [:create]
        resources :game, only: [:create]
      end
    end
  end

  root 'usersgames#index'
end
