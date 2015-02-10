class AddFontField < ActiveRecord::Migration
  def change
    add_column :users, :font_colour, :string
  end
end
