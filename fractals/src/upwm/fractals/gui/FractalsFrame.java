package upwm.fractals.gui;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JPanel;

import upwm.fractals.FractalSet;
import upwm.fractals.Mandelbrot;

@SuppressWarnings("serial")
public class FractalsFrame extends JFrame {
	private CanvasPane canvasPanel = new CanvasPane();

	private JPanel contentPanel = new JPanel();
	private JPanel buttonsPanel = new JPanel();

	private JComboBox<String> chooseSet;

	{
		String[] options = { "Mandelbrot", "Julia" };
		chooseSet = new JComboBox<String>(options);
	}

	public FractalsFrame() {
		initGUI();
	}

	private void initGUI() {
		contentPanel.setLayout(new BorderLayout());
		contentPanel.add(canvasPanel, BorderLayout.CENTER);
		contentPanel.add(buttonsPanel, BorderLayout.PAGE_END);
		buttonsPanel.add(chooseSet);
		canvasPanel.setPreferredSize(new Dimension(1700, 900));
		setContentPane(contentPanel);
		pack();

		FractalSet set = new Mandelbrot();
		FractalSetController ctrlr = new FractalSetController(canvasPanel, set);
		ctrlr.paintGraph();

		canvasPanel.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (e.getButton() == MouseEvent.BUTTON1) {
					ctrlr.zoomIn(e.getX(), e.getY());
				} else {
					ctrlr.zoomOut(e.getX(), e.getY());
				}
			}
		});
		setDefaultCloseOperation(EXIT_ON_CLOSE);

	}

	public static void main(String[] args) {
		FractalsFrame ff = new FractalsFrame();
		ff.setVisible(true);
	}
}
