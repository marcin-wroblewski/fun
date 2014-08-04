package gwiazdki.forms;

import gwiazdki.model.StarModel;

import java.awt.BorderLayout;

import javax.swing.JFrame;
import javax.swing.JPanel;

public class StarFrame extends JFrame {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5432347603977226289L;
	private JPanel panel = new JPanel();
	private StarPanel starPanel = new StarPanel();
	private StarModel starModel = StarModel.createStarModel();
	private StarController starController = new StarController(starModel, starPanel);
	private ControlPanel controlPanel = new ControlPanel(starController);
	
	public StarFrame() {
		this.setDefaultCloseOperation(EXIT_ON_CLOSE);
		this.setSize(800, 600);
		this.setContentPane(panel);
		panel.setLayout(new BorderLayout());
		
		panel.add(controlPanel, BorderLayout.PAGE_START);
		panel.add(starPanel, BorderLayout.CENTER);
	}
	
	@Override
	public void setVisible(boolean b) {
		super.setVisible(b);
		controlPanel.refresh();
	}
	
}
