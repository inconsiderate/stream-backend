class AddGreetingField < ActiveRecord::Migration
  def change
    add_column :users, :greeting, :string
  end
end
